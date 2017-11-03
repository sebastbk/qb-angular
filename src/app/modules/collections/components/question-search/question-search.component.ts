import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Tag } from '../../models/tag';
import { TagSearchService } from '../../services/tag-search.service';

@Component({
  selector: 'qb-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.scss']
})
export class QuestionSearchComponent implements OnInit {
  tags: Observable<Tag[]>;
  private searchTerms = new Subject<string>();

  searchForm: FormGroup;
  showFilters = false;

  constructor(
    private fb: FormBuilder,
    private tagSearchService: TagSearchService
  ) { 
    this.createForm();
  }
  
  createForm() {
    this.searchForm = this.fb.group({
      query: ''
    })
  }

  onSubmit() {
    // TODO: Navigate
  }

  updateQuery(query: string, cursor: number, word: string) {
    let value = query.replaceWordAt(cursor, word);
    this.searchForm.get('query').setValue(value);
  }

  searchTags(query: string, cursor=0) {
    this.clearTags();
    let term = query.getWordAt(cursor);
    this.searchTerms.next(term);
  }

  clearTags() {
    this.searchTerms.next();
  }

  ngOnInit() {
    this.tags = this.searchTerms
      .distinctUntilChanged()
      .switchMap(term => term ?
        this.tagSearchService.search(term) : Observable.of<Tag[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Tag[]>([]);
      })
  }

}
