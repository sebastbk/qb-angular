import { Injectable } from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Question } from '../models/question';
import { QuestionService } from './question.service';

@Injectable()
export class QuestionDetailsResolver implements Resolve<Question> {

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question> {
    let id = route.paramMap.get('id');

    return this.questionService.getQuestion(+id).map(question => {
      if (question) {
        return question;
      } else {
        this.router.navigate(['/questions']);
        return null;
      }
    })
  }

}
