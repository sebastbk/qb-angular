import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Set } from '../../models/set';
import { SetService } from '../../services/set.service';

import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'qb-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.scss']
})
export class SetDetailComponent implements OnInit {
  set: Set;
  questions: Question[];

  constructor(
    private route: ActivatedRoute,
    private setService: SetService,
    private questionService: QuestionService,
  ) { }

  init(set): void {
    this.set = set;
    this.questionService.getQuestions()
      .then(questions => this.questions = questions);
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.setService.getSet(+params.get('id')))
      .subscribe(this.init.bind(this))
  }
}