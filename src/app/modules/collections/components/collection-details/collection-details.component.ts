import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Collection, CollectionService } from '../../../../core/services/collection.service';
import { Question, QuestionService } from '../../../../core/services/question.service';

@Component({
  selector: 'qb-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {
  @Input() collection: Collection;
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
    if(!this.collection) { this.getCollection(); }
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
    let observable = this.collection.id ? 
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

  getCollection(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // return a new collection obj if the id is 0
    if (id === null) {
      this.collection = new Collection();
      this.collectionForm.enable();
      return;
    }
    this.collectionService.getCollection(+id)
      .subscribe(collection => this.setCollection(collection));
  }
}