import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Collection } from './collection.model';
import { Question } from '@qb/questions/shared/question.model';
import { AuthService } from '@qb/auth/shared/auth.service';

@Injectable()
export class CollectionService {
  private collectionsUrl = 'http://127.0.0.1:8000/api/sets';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  searchCollections(query: string): Observable<Collection[]> {
    const tags = query.split(/\s+/).join(',');
    const url = `${this.collectionsUrl}/?search=${tags}`;
    return this.http.get<Collection[]>(url).pipe(
      catchError(this.handleError('searchCollections', [])),
      map((data: any) => data.results)
    );
  }

  getCollections(): Observable<Collection[]> {
    const url = `${this.collectionsUrl}/`;
    return this.http.get<Collection[]>(url).pipe(
      catchError(this.handleError('getCollections', [])),
      map((data: any) => data.results)
    );
  }

  getCollection(id: number): Observable<Collection> {
    const url = `${this.collectionsUrl}/${id}/`;
    return this.http.get<Collection>(url).pipe(
      catchError(this.handleError<Collection>(`getCollection id=${id}`))
    );
  }

  getCollectionQuestions(id: number): Observable<Question[]> {
    const url = `${this.collectionsUrl}/${id}/questions/`;
    return this.http.get<Question[]>(url).pipe(
      catchError(this.handleError(`getCollectionQuestions id=${id}`, []))
    );
  }

  updateCollection(collection: Collection): Observable<Collection> {
    const url = `${this.collectionsUrl}/${collection.id}/`;
    return this.http.patch(url, collection, this.authService.httpOptions).pipe(
      catchError(this.handleError<any>(`updateCollection id=${collection.id}`))
    );
  }

  createCollection(collection: Collection): Observable<Collection> {
    const url = `${this.collectionsUrl}/`;
    return this.http.post<Collection>(url, collection, this.authService.httpOptions).pipe(
      catchError(this.handleError<any>('createCollection'))
    );
  }

  deleteCollection(collection: Collection | number): Observable<Collection> {
    const id = typeof collection === 'number' ? collection : collection.id;
    const url = `${this.collectionsUrl}/${id}/`;

    return this.http.delete<Collection>(url, this.authService.httpOptions).pipe(
      catchError(this.handleError<any>(`deleteCollection id=${id}`))
    );
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
    };
  }
}
