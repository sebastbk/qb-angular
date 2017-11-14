import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from '../models/tag';
// re export for convenience
export { Tag };

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TagService {
  private tagsUrl = 'api/tags';

  constructor(private http: HttpClient) { }

  searchTags(term: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.tagsUrl}/?name=${term}`).pipe(
      catchError(this.handleError('searchTags', []))
    )
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl).pipe(
      catchError(this.handleError('getTags', []))
    );
  }
  
  getTag(id: number): Observable<Tag> {
    const url = `${this.tagsUrl}/${id}`;
    return this.http.get<Tag>(url).pipe(
      catchError(this.handleError<Tag>(`getTag id=${id}`))
    );
  }
  
  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put(this.tagsUrl, tag, httpOptions).pipe(
      catchError(this.handleError<any>('updateTag'))
    )
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.tagsUrl, tag, httpOptions).pipe(
      catchError(this.handleError<any>('createTag'))
    )
  }

  deleteTag(tag: Tag | number): Observable<Tag> {
    const id = typeof tag === 'number' ? tag : tag.id;
    const url = `${this.tagsUrl}/${id}`;

    return this.http.delete<Tag>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteTag'))
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