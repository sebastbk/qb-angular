import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Set } from './set';

@Injectable()
export class SetService {
  private setsUrl = 'api/sets';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getSets(): Promise<Set[]> {
    return this.http.get(this.setsUrl)
      .toPromise()
      .then(response => response.json().data as Set[])
      .catch(this.handleError);
  }

  getSet(id: number): Promise<Set> {
    const url = `${this.setsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Set)
      .catch(this.handleError);
  }

  update(set: Set): Promise<Set> {
    const url = `${this.setsUrl}/${set.id}`;
    return this.http
      .put(url, JSON.stringify(set), {headers: this.headers})
      .toPromise()
      .then(() => set)
      .catch(this.handleError);
  }

  create(name: string): Promise<Set> {
    return this.http
      .post(this.setsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Set)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.setsUrl}/${id}`;
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