import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { QuestionSearchService } from '../../services/question-search.service';

import { QuestionParams } from '../../models/question-params';

@Component({
  selector: 'qb-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private questionSearchService: QuestionSearchService) { }

  handleError() {
    console.log('An error occurred.')
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.questionSearchService.search(params as QuestionParams)
          .toPromise()
          .then(questions => this.questions = questions)
          .catch(this.handleError);
      })
  }

}
