import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Tag } from '../models/tag';

@Injectable()
export class TagService {
  private tagsUrl = 'api/tags';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getTags(): Promise<Tag[]> {
    return this.http.get(this.tagsUrl)
      .toPromise()
      .then(response => response.json().data as Tag[])
      .catch(this.handleError);
  }

  getTag(id: number): Promise<Tag> {
    const url = `${this.tagsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Tag)
      .catch(this.handleError);
  }

  update(tag: Tag): Promise<Tag> {
    const url = `${this.tagsUrl}/${tag.id}`;
    return this.http
      .put(url, JSON.stringify(tag), {headers: this.headers})
      .toPromise()
      .then(() => tag)
      .catch(this.handleError);
  }

  create(name: string): Promise<Tag> {
    return this.http
      .post(this.tagsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Tag)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tagsUrl}/${id}`;
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