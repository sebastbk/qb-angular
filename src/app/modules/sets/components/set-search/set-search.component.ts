import { Component, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable }      from 'rxjs/Observable';
import { Subject }         from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of }              from 'rxjs/observable/of';

import { tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Set } from '../../models/set';
import { SetService } from '../../services/set.service';
import { SearchParams } from '../../models/search-params';

import { Tag } from '../../../tags/models/tag';
import { TagService } from '../../../tags/services/tag.service';

@Component({
  selector: 'qb-set-search',
  templateUrl: './set-search.component.html',
  styleUrls: ['./set-search.component.scss']
})
export class SetSearchComponent implements OnInit {
  sets$: Observable<Set[]>;
  private searchParams = new BehaviorSubject<SearchParams>({} as SearchParams);

  tags$: Observable<Tag[]>;
  private searchTerms = new Subject<string>();

  searchForm: FormGroup;
  showFilters = false;

  constructor(
    private fb: FormBuilder,
    private setService: SetService,
    private tagService: TagService
  ) { }

  createForm() {
    this.searchForm = this.fb.group({
      q: ''
    })
  }

  onSubmit(): void {
    this.searchParams.next(this.searchForm.value as SearchParams);
  }

  updateQuery(query: string, cursor: number, word: string) {
    let value = query.replaceWordAt(cursor, word);
    this.searchForm.get('q').setValue(value);
  }

  searchTags(query: string, cursor=0) {
    let term = query.getWordAt(cursor);
    this.searchTerms.next(term);
  }

  clearTags() {
    this.searchTerms.next();
  }

  ngOnInit(): void {
    this.createForm();

    this.sets$ = this.searchParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((params: SearchParams) => this.setService.searchSets(params)),
    );

    this.tags$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => term ?
        this.tagService.searchTags(term) : of<Tag[]>([])),
    );
  }

}
