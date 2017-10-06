import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostService {
  private postsUrl = 'api/posts';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPosts(): Promise<Post[]> {
    return this.http.get(this.postsUrl)
      .toPromise()
      .then(response => response.json().data as Post[])
      .catch(this.handleError);
  }

  getPost(id: number): Promise<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Post)
      .catch(this.handleError);
  }

  update(post: Post): Promise<Post> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http
      .put(url, JSON.stringify(post), {headers: this.headers})
      .toPromise()
      .then(() => post)
      .catch(this.handleError);
  }

  create(name: string): Promise<Post> {
    return this.http
      .post(this.postsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Post)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}