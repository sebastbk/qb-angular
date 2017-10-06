import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';

import { Question } from './question';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
})
export class QuestionListComponent {
  @Input() questions: Question[];

  constructor(private router: Router) {}

  gotoDetail(question: Question): void {
    this.router.navigate(['/questions/', question.id]);
  }
}