import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { QuestionService } from '../../services/question.service'
import { Question } from '../../models/question';

@Component({
  selector: 'qb-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
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
