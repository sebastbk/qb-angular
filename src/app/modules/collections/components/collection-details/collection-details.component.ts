import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Collection } from '../../models/collection';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'qb-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {
  @Input() collection: Collection;

  editMode: boolean;
  collectionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private collectionService: CollectionService
  ) {
    this.createForm();
  }

  createForm() {
    this.collectionForm = this.fb.group({
      title: '',
      tags: ''
    })
  }

  ngOnInit(): void {
    if(!this.collection) { this.getCollection(); }
  }

  ngOnChanges() {
    this.collectionForm.reset({
      title: this.collection.title,
      tags: this.collection.tags.join(' ')
    })
  }

  onSubmit() {
    this.collection = this.prepareSaveCollection();
    let observable = this.collection.id ? 
      this.collectionService.updateCollection(this.collection) : 
      this.collectionService.createCollection(this.collection);
    observable.subscribe(collection => collection => this.setCollection(collection));
  }

  setCollection(collection: Collection) {
    this.collection = collection;
    this.revert();
  }

  revert() { this.ngOnChanges(); }

  goBack(): void {
    this.location.back();
  }

  prepareSaveCollection(): Collection {
    const formModel = this.collectionForm.value;
    
    const saveCollection: Collection = {
      id: this.collection.id,
      title: formModel.title as string,
      tags: formModel.tags.split(/\s/) as string[]
    };
    return saveCollection;
  }

  getCollection(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // return a new collection obj if the id is 0
    if (id === 0) { this.collection = new Collection(); return; }
    this.collectionService.getCollection(id)
      .subscribe(collection => this.setCollection(collection));
  }
}