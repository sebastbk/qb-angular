import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

import { Question } from '../../models/question';

@Component({
  selector: 'qb-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent {
  @Input() question: Question;
}