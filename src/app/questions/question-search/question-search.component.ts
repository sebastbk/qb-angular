import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

import { tap, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Question } from '../shared/question.model';
import { QuestionService, SearchParams, GetManyResults } from '../shared/question.service';
import { Tag } from '@qb/tags/shared/tag.model';
import { TagService } from '@qb/tags/shared/tag.service';

const limits = [10, 30, 60];

@Component({
  selector: 'qb-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss'],
})
export class QuestionSearchComponent implements OnInit {
  tags$: Observable<Tag[]>;
  questions$: Observable<GetManyResults<Question>>;
  searchForm: FormGroup;

  get page() { return this.offset / this.limit + 1; }

  private offset = 0;
  private limit = limits[0];

  private searchParams = new BehaviorSubject<SearchParams>({} as SearchParams);
  private searchTerms = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private tagService: TagService
  ) {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      search: '',
      limit: 10,
    });
  }

  setForm(params: SearchParams) {
    this.searchForm.reset({
      search: params.search,
      limit:  params.limit,
    });
  }

  getSearchParams(): SearchParams {
    const formModel = this.searchForm.value;
    const params: SearchParams = {
      search: formModel.search,
      limit:  formModel.limit,
      offset: this.offset,
    };
    return params;
  }

  onSubmit() {
    const params = this.getSearchParams();
    params.offset = 0; // reset to first page
    this.setUrlParams(params);
  }

  onPageChange(page: number) {
    const params = this.getSearchParams();
    params.offset = (page - 1) * this.limit;
    this.setUrlParams(params);
  }

  setUrlParams(params: SearchParams) {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: params,
    });
  }

  onSelectTag(search: string, cursor: number, word: string) {
    const value = search.replaceWordAt(cursor, word);
    this.searchForm.get('search').setValue(value);
  }

  searchTags(query: string, cursor= 0) {
    const term = query.getWordAt(cursor);
    this.searchTerms.next(term);
  }

  clearTags() {
    this.searchTerms.next();
  }

  ngOnInit() {
    this.questions$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const searchParams: SearchParams = {
          search:  params.get('search') || '',
          limit:  +(params.get('limit') || 10),
          offset: +params.get('offset'), // convert to a number (defaults 0 if null)
        };
        return searchParams;
      }),
      switchMap((params: SearchParams) => {
        this.setForm(params);
        this.limit = params.limit;
        this.offset = params.offset;
        return this.questionService.getQuestions(params);
      }),
    );

    this.tags$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => term ?
        this.tagService.searchTags(term) : of<Tag[]>([])),
    );
  }

}
