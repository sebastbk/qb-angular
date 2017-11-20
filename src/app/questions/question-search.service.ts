import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Question } from './shared/question.model';
import { QuestionService } from './shared/question.service';

export class QuestionSearchConfig {
  query: string;

  constructor (query?: string) {
    this.query = query || '';
  }

  public copy(): QuestionSearchConfig {
    return new QuestionSearchConfig(this.query);
  }
}

@Injectable()
export class QuestionSearchService {
  private _config = new QuestionSearchConfig();
  get config(): QuestionSearchConfig {
    console.log(this._config);
    return this._config.copy();
  }
  set config(config: QuestionSearchConfig) {
    this._config = config.copy();
  }

  private _questions$;
  get questions$(): Observable<Question[]> {
    return this._questions$;
  }

  private _searchParams;

  constructor(private questionService: QuestionService) {
    this._searchParams = new BehaviorSubject<QuestionSearchConfig>(this._config);
    this._questions$ = this._searchParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((config: QuestionSearchConfig) =>
        this.questionService.searchQuestions(config.query)),
    );
  }

  search(config: QuestionSearchConfig) {
    this.config = config;
    this._searchParams.next(this._config);
  }
}
