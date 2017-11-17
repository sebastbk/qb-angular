import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Collection } from './collection.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CollectionService {
  private collectionsUrl = 'api/collections';

  constructor(private http: HttpClient) { }
  
  searchCollections(query: string): Observable<Collection[]> {
    let tags = query.split(/\s/).join(')|(');
    return this.http.get<Collection[]>(`${this.collectionsUrl}?tags=(${tags})`).pipe(
      catchError(this.handleError('searchCollections', []))
    )
  }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.collectionsUrl).pipe(
      catchError(this.handleError('getCollections', []))
    );
  }
  
  getCollection(id: number): Observable<Collection> {
    const url = `${this.collectionsUrl}/${id}`;
    return this.http.get<Collection>(url).pipe(
      catchError(this.handleError<Collection>(`getCollection id=${id}`))
    );
  }
  
  updateCollection(collection: Collection): Observable<Collection> {
    return this.http.put(this.collectionsUrl, collection, httpOptions).pipe(
      catchError(this.handleError<any>('updateCollection'))
    )
  }

  createCollection(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(this.collectionsUrl, collection, httpOptions).pipe(
      catchError(this.handleError<any>('createCollection'))
    )
  }

  deleteCollection(collection: Collection | number): Observable<Collection> {
    const id = typeof collection === 'number' ? collection : collection.id;
    const url = `${this.collectionsUrl}/${id}`;

    return this.http.delete<Collection>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteCollection'))
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