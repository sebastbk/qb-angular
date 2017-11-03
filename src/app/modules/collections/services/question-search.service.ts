import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Question } from '../models/question';

@Injectable()
export class QuestionSearchService {
  constructor(private http: Http) { }
  
  search(term: string): Observable<Question[]> {
    return this.http
      .get(`api/questions/?tags=${term}`)
      .map(response => response.json().data as Question[])
  }
}