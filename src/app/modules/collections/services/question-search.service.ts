import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Question } from '../models/question';
import { QuestionParams } from '../models/question-params';

@Injectable()
export class QuestionSearchService {
  constructor(private http: Http) { }
  
  search(params: QuestionParams): Observable<Question[]> {
    let tags = params.q ? params.q.split(/\s/).join(')|(') : '';
    return this.http
      .get('api/questions', {search: {tags: `(${tags})`}})
      .map(response => response.json().data as Question[])
  }
}