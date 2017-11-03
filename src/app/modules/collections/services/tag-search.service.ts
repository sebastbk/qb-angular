import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Tag } from '../models/tag';

@Injectable()
export class TagSearchService {
  constructor(private http: Http) { }
  
  search(term: string): Observable<Tag[]> {
    return this.http
      .get(`api/tags/?name=${term}`)
      .map(response => response.json().data as Tag[])
  }
}