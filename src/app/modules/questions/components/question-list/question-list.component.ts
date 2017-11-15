import { Component, Input } from '@angular/core';

import { Question } from '@core/models/question';

@Component({
  selector: 'qb-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() questions: Question[];
}
