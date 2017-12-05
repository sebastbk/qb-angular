import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable()
export class PostService {
  private postsUrl = 'http://127.0.0.1:8000/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    const url = `${this.postsUrl}/`;
    return this.http.get<Post[]>(url).pipe(
      catchError(this.handleError('getPosts', [])),
      map((data: any) => data.results)
    );
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}/`;
    return this.http.get<Post>(url).pipe(
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post.id}/`;
    return this.http.put(url, post).pipe(
      catchError(this.handleError<any>(`updatePost id=${post.id}`))
    );
  }

  createPost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/`;
    return this.http.post<Post>(url, post).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  deletePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}/`;

    return this.http.delete<Post>(url).pipe(
      catchError(this.handleError<any>(`deletePost id=${id}`))
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
