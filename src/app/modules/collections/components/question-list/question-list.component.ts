import { Component, Input } from '@angular/core';
// import { Router }           from '@angular/router';

import { Question } from '../../models/question';

@Component({
  selector: 'qb-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() questions: Question[];
  public selectedQuestion: Question;

  // constructor(private router: Router) {}

  setSelected(question: Question): void {
    this.selectedQuestion = question;
  }

  ngOnChanges(): void {
    if (!this.selectedQuestion && this.questions)
      this.selectedQuestion = this.questions[0]
  }

  // gotoDetail(question: Question): void {
  //   this.router.navigate(['/questions/', question.id]);
  // }
}