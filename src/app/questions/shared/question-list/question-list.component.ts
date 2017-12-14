import { Component, Input, HostListener, OnChanges, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

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

  private unsubscribe: Subject<void> = new Subject<void>();

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
    this.questionService.getQuestions(params)
      .takeUntil(this.unsubscribe) // cancel request with `this.unsubscribe.next()`
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
    this.unsubscribe.next(); // clear existing request
    this.questions = []; // reset results
    this.loadPage(this.params);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
