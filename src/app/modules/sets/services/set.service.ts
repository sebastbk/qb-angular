import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Set } from '../models/set';
import { SearchParams } from '../models/search-params';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SetService {
  private setsUrl = 'api/sets';

  constructor(private http: HttpClient) { }
  
  searchSets(params: SearchParams): Observable<Set[]> {
    let tags = params.q ? params.q.split(/\s/).join(')|(') : '';
    return this.http.get<Set[]>(`${this.setsUrl}?tags=(${tags})`).pipe(
      catchError(this.handleError('searchSets', []))
    )
  }

  getSets(): Observable<Set[]> {
    return this.http.get<Set[]>(this.setsUrl).pipe(
      catchError(this.handleError('getSets', []))
    );
  }
  
  getSet(id: number): Observable<Set> {
    const url = `${this.setsUrl}/${id}`;
    return this.http.get<Set>(url).pipe(
      catchError(this.handleError<Set>(`getSet id=${id}`))
    );
  }
  
  updateSet(set: Set): Observable<Set> {
    return this.http.put(this.setsUrl, set, httpOptions).pipe(
      catchError(this.handleError<any>('updateSet'))
    )
  }

  createSet(set: Set): Observable<Set> {
    return this.http.post<Set>(this.setsUrl, set, httpOptions).pipe(
      catchError(this.handleError<any>('createSet'))
    )
  }

  deleteSet(set: Set | number): Observable<Set> {
    const id = typeof set === 'number' ? set : set.id;
    const url = `${this.setsUrl}/${id}`;

    return this.http.delete<Set>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteSet'))
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