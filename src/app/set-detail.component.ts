import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Set }                from './set';
import { SetService }         from './set.service'
import { SetQuestionService } from './set-question.service';
import { Question }           from './question';

@Component({
  selector: 'set-detail',
  templateUrl: './set-detail.component.html',
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

export class SetDetailComponent implements OnInit {
  set: Set;
  questions: Question[];
  
  constructor(
    private setService: SetService,
    private setQuestionService: SetQuestionService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSet();
    this.getQuestions();
  }
  
  getSet() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.setService.getSet(+params.get('id')))
      .subscribe(set => this.set = set);
  }
  
  getQuestions() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.setQuestionService.getQuestions(+params.get('id')))
      .subscribe(questions => this.questions = questions);
  }
  
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.setService.update(this.set)
      .then(() => this.goBack());
  }
}