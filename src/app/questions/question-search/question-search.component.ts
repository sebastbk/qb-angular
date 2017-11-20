import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';

import { tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Question } from '../shared/question.model';
import { QuestionSearchConfig, QuestionSearchService } from '../question-search.service';
import { Tag } from '@qb/tags/shared/tag.model';
import { TagService } from '@qb/tags/shared/tag.service';

@Component({
  selector: 'qb-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss'],
  providers: [ QuestionSearchService ]
})
export class QuestionSearchComponent implements OnInit {
  questions$: Observable<Question[]>;

  tags$: Observable<Tag[]>;
  private searchTerms = new Subject<string>();

  searchForm: FormGroup;
  showFilters = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questionSearchService: QuestionSearchService,
    private tagService: TagService
  ) {
    this.createForm(this.questionSearchService.config);
    this.questions$ = this.questionSearchService.questions$;
  }

  createForm(config: QuestionSearchConfig) {
    this.searchForm = this.fb.group(config);
  }

  onSubmit(): void {
    const query = this.searchForm.get('query').value as string;
    const config = new QuestionSearchConfig(query);
    this.questionSearchService.search(config);
  }

  updateQuery(query: string, cursor: number, word: string) {
    const value = query.replaceWordAt(cursor, word);
    this.searchForm.get('query').setValue(value);
  }

  searchTags(query: string, cursor= 0) {
    const term = query.getWordAt(cursor);
    this.searchTerms.next(term);
  }

  clearTags() {
    this.searchTerms.next();
  }

  ngOnInit(): void {
    this.tags$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => term ?
        this.tagService.searchTags(term) : of<Tag[]>([])),
    );
  }

}
