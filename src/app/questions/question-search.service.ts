import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Question } from './shared/question.model';
import { QuestionService } from './shared/question.service';

export class SearchConfig {
  search: string;
  difficulty?: number;
}

@Injectable()
export class QuestionSearchService {
  config = new SearchConfig();
  questions$: Observable<Question[]>;

  private _searchParams;

  constructor(private questionService: QuestionService) {
    this._searchParams = new BehaviorSubject<SearchConfig>(this.config);
    this.questions$ = this._searchParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((config: SearchConfig) =>
        this.questionService.getQuestions(config)),
    );
  }

  search(config: SearchConfig) {
    this.config = config;
    this._searchParams.next(this.config);
  }
}
