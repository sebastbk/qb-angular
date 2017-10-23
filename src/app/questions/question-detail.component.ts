import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { QuestionService } from './question.service'
import { Question }        from './question';

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html',
  styles: [`
    label {
      font-weight: bold;
      text-transform: capitalize;
    }
    label::after {
      content: ":";
      margin-right: 1em;
    }
  `]
})

export class QuestionDetailComponent implements OnInit {
  question: Question;
  
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.questionService.getQuestion(+params.get('id')))
      .subscribe(question => this.question = question)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.questionService.update(this.question)
      .then(() => this.goBack());
  }
}