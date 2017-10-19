import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Question } from './question';
import { QuestionService } from './question.service';

@Injectable()
export class SetQuestionService {
  private questionsUrl = 'api/set/${id}/questions';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private questionService: QuestionService
  ) { }

  getQuestions(id: number): Promise<Question[]> {
    return this.questionService.getQuestions();
    // return this.http.get(this.questionsUrl)
    //   .toPromise()
    //   .then(response => response.json().data as Question[])
    //   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}