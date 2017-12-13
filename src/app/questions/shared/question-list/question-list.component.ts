import { Component, Input, HostListener, OnChanges } from '@angular/core';

import { Question } from '../question.model';
import { QuestionService, SearchParams, GetManyResults } from '../question.service';

@Component({
  selector: 'qb-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnChanges {
  @Input() params: SearchParams;
  questions: Question[];
  results: number;
  isLoading: boolean;
  stopLoading: boolean;

  private page: number;

  constructor(private questionService: QuestionService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (pos === max && !this.isLoading && !this.stopLoading) {
      this.loadNextPage();
    }
  }

  scrollTop() {
    document.scrollingElement.scrollTo(0, 0);
  }

  appendQuestions(questions: Question[]) {
    this.questions = this.questions.concat(questions);
  }

  loadPage(params: SearchParams) {
    this.isLoading = true;
    this.questionService.getQuestions(params).toPromise()
      .then((data: GetManyResults<Question>) => {
        this.isLoading = false;
        this.page = data.page;
        this.results = data.count;
        this.appendQuestions(data.results);
      })
      .catch(error => {
        this.isLoading = false;
        if (error.status === 404) {
          this.stopLoading = true;
        } else {
          console.log(error);
        }
      });
  }

  loadNextPage() {
    const params = Object.assign({}, this.params);
    params['page'] = this.page + 1;
    this.loadPage(params);
  }

  ngOnChanges() {
    this.questions = []; // empty existing array
    this.isLoading = false;
    this.stopLoading = false;
    this.loadPage(this.params);
  }

}
