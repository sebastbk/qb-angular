import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { QuestionSearchService } from './question-search.service';
import { Question }              from './question';

@Component({
  selector: 'question-search',
  templateUrl: './question-search.component.html',
  providers: [QuestionSearchService]
})
export class QuestionSearchComponent implements OnInit {
  questions: Observable<Question[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private questionSearchService: QuestionSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.questions = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.questionSearchService.search(term)
        // or the observable of empty questions if there was no search term
        : Observable.of<Question[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Question[]>([]);
      });
  }
}