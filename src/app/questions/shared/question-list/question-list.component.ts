import { Component, Input, HostListener, OnChanges, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ISubscription, Subscription } from 'rxjs/Subscription';

import { Question } from '../question.model';
import { QuestionService, SearchParams, PaginatedResponse } from '../question.service';

@Component({
  selector: 'qb-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnChanges, OnDestroy {
  @Input() params: SearchParams;
  questions: Question[];
  count: number;
  page: number;
  hasNext: boolean;
  isLoading: boolean;

  private subscription: ISubscription = new Subscription();

  constructor(private questionService: QuestionService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (this.hasNext && !this.isLoading && pos === max) {
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
    this.subscription = this.questionService.getQuestions(params)
      .subscribe((data: PaginatedResponse<Question>) => {
        this.page = data.page;
        this.count = data.count;
        this.hasNext = data.has_next;
        this.appendQuestions(data.results);
        this.isLoading = false;
      });
  }

  loadNextPage() {
    const params = Object.assign({}, this.params);
    params['page'] = this.page + 1;
    this.loadPage(params);
  }

  ngOnChanges() {
    this.subscription.unsubscribe(); // clear existing request
    this.questions = []; // reset results
    this.loadPage(this.params);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
