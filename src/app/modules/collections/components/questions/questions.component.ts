import { Component, OnInit } from '@angular/core';

import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'qb-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions()
      .then(questions => this.questions = questions);
  }

}
