import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

import { tap, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Question } from '../shared/question.model';
import { SearchParams } from '../shared/question.service';
import { Tag } from '@qb/tags/shared/tag.model';
import { TagService } from '@qb/tags/shared/tag.service';

@Component({
  selector: 'qb-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss'],
})
export class QuestionSearchComponent implements OnInit {
  tags$: Observable<Tag[]>;
  searchForm: FormGroup;
  params: SearchParams;

  private searchTerms = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService
  ) {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      search: '',
    });
  }

  setForm(params: SearchParams) {
    this.searchForm.reset({
      search: params.search,
    });
  }

  onSubmit() {
    const params = this.searchForm.value;
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
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        const searchParams: SearchParams = {
          search: params.get('search') || '',
          page:  +(params.get('page') || 1)
        };
        this.params = searchParams;
        this.setForm(searchParams);
      }
    );

    this.tags$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => term ?
        this.tagService.searchTags(term) : of<Tag[]>([])),
    );
  }

}
