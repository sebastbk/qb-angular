import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable }      from 'rxjs/Observable';
import { Subject }         from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of }              from 'rxjs/observable/of';

import { tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Question, QuestionService } from '@core/services/question.service';
import { Tag, TagService } from '@core/services/tag.service';

@Component({
  selector: 'qb-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss']
})
export class QuestionSearchComponent implements OnInit {
  questions$: Observable<Question[]>;
  private searchParams = new BehaviorSubject<string>('');

  tags$: Observable<Tag[]>;
  private searchTerms = new Subject<string>();

  searchForm: FormGroup;
  showFilters = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private tagService: TagService
  ) { }

  createForm() {
    this.searchForm = this.fb.group({
      q: ''
    })
  }

  onSubmit(): void {
    let query = this.searchForm.get('q').value as string
    this.searchParams.next(query);
  }

  updateQuery(query: string, cursor: number, word: string) {
    let value = query.replaceWordAt(cursor, word);
    this.searchForm.get('q').setValue(value);
  }

  searchTags(query: string, cursor=0) {
    let term = query.getWordAt(cursor);
    this.searchTerms.next(term);
  }

  clearTags() {
    this.searchTerms.next();
  }

  ngOnInit(): void {
    this.createForm();

    this.questions$ = this.searchParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.questionService.searchQuestions(query)),
    );

    this.tags$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => term ?
        this.tagService.searchTags(term) : of<Tag[]>([])),
    );
  }

}
