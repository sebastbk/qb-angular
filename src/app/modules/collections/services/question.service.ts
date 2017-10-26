import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Question } from '../models/question';

@Injectable()
export class QuestionService {
  private questionsUrl = 'api/questions';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getQuestions(): Promise<Question[]> {
    return this.http.get(this.questionsUrl)
      .toPromise()
      .then(response => response.json().data as Question[])
      .catch(this.handleError);
  }

  getQuestion(id: number): Promise<Question> {
    const url = `${this.questionsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Question)
      .catch(this.handleError);
  }

  update(question: Question): Promise<Question> {
    const url = `${this.questionsUrl}/${question.id}`;
    return this.http
      .put(url, JSON.stringify(question), {headers: this.headers})
      .toPromise()
      .then(() => question)
      .catch(this.handleError);
  }

  create(name: string): Promise<Question> {
    return this.http
      .post(this.questionsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Question)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.questionsUrl}/${id}`;
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