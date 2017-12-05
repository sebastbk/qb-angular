import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from './tag.model';

@Injectable()
export class TagService {
  private tagsUrl = 'http://127.0.0.1:8000/api/tags';

  constructor(private http: HttpClient) { }

  searchTags(term: string): Observable<Tag[]> {
    const url = `${this.tagsUrl}/?search=${term}`;
    return this.http.get<Tag[]>(url).pipe(
      catchError(this.handleError('searchTags', [])),
      map((data: any) => data.results)
    );
  }

  getTags(): Observable<Tag[]> {
    const url = `${this.tagsUrl}/`;
    return this.http.get<Tag[]>(url).pipe(
      catchError(this.handleError('getTags', [])),
      map((data: any) => data.results)
    );
  }

  getTag(id: number): Observable<Tag> {
    const url = `${this.tagsUrl}/${id}/`;
    return this.http.get<Tag>(url).pipe(
      catchError(this.handleError<Tag>(`getTag id=${id}`))
    );
  }

  updateTag(tag: Tag): Observable<Tag> {
    const url = `${this.tagsUrl}/${tag.id}/`;
    return this.http.patch(url, tag).pipe(
      catchError(this.handleError<any>(`updateTag id=${tag.id}`))
    );
  }

  createTag(tag: Tag): Observable<Tag> {
    const url = `${this.tagsUrl}/`;
    return this.http.post<Tag>(url, tag).pipe(
      catchError(this.handleError<any>('createTag'))
    );
  }

  deleteTag(tag: Tag | number): Observable<Tag> {
    const id = typeof tag === 'number' ? tag : tag.id;
    const url = `${this.tagsUrl}/${id}/`;

    return this.http.delete<Tag>(url).pipe(
      catchError(this.handleError<any>(`deleteTag id=${id}`))
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
