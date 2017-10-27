import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { QuestionService } from '../../services/question.service'
import { Question } from '../../models/question';

@Component({
  selector: 'qb-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  question: Question;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.questionService.getQuestion(+params.get('id')))
      .subscribe(question => this.question = question)
  }
}