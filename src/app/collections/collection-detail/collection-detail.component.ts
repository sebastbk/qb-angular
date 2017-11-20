import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Collection } from '../shared/collection.model';
import { CollectionService } from '../shared/collection.service';
import { Question } from '@qb/questions/shared/question.model';
import { QuestionService } from '@qb/questions/shared/question.service';

@Component({
  selector: 'qb-collection-detail',
  templateUrl: './collection-detail.component.html',
})
export class CollectionDetailComponent implements OnInit, OnChanges {
  collection: Collection;
  questions: Question[];

  collectionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private collectionService: CollectionService,
    private questionService: QuestionService,
  ) {
    this.createForm();
  }

  createForm() {
    this.collectionForm = this.fb.group({
      title: '',
      tags: ''
    });
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { collection: Collection }) => {
        this.collection = data.collection;
        this.ngOnChanges();
      });
  }

  ngOnChanges() {
    this.collectionForm.disable();
    this.collectionForm.reset({
      title: this.collection.title,
      tags: this.collection.tags.join(' ')
    });
    this.questionService.getCollectionQuestions(this.collection.id)
      .subscribe(questions => this.questions = questions);
  }

  onSubmit() {
    this.collectionForm.disable();
    this.collection = this.prepareSaveCollection();
    const observable = this.collection.id ?
      this.collectionService.updateCollection(this.collection) :
      this.collectionService.createCollection(this.collection);
    observable.subscribe(collection => {
      // TODO: this method seems to be rather slow to update the url
      this.location.replaceState(`/collections/${collection.id}`);
      this.setCollection(collection);
    });
  }

  setCollection(collection: Collection) {
    this.collection = collection;
    this.ngOnChanges();
  }

  cancel(): void {
    this.collection.id ? this.ngOnChanges() : this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  prepareSaveCollection(): Collection {
    const formModel = this.collectionForm.value;

    const saveCollection: Collection = {
      id: this.collection.id,
      title: formModel.title as string,
      tags: formModel.tags.trim().replace(/\s+/g, ' ').split(/\s/) as string[]
    };
    return saveCollection;
  }
}
