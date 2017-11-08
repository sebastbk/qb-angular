import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from '../models/tag';

@Injectable()
export class TagSearchService {
  private tagUrl = 'api/tags';

  constructor(private http: HttpClient) { }
  
  searchTags(term: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.tagUrl}/?name=${term}`).pipe(
      catchError(this.handleError('searchTags', []))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any):  Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}