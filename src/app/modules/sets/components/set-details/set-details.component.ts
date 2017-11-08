import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Set } from '../../models/set';
import { SetService } from '../../services/set.service';

@Component({
  selector: 'qb-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.scss']
})
export class SetDetailsComponent implements OnInit {
  @Input() set: Set;

  editMode: boolean;
  setForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private setService: SetService
  ) {
    this.createForm();
  }

  createForm() {
    this.setForm = this.fb.group({
      title: '',
      tags: ''
    })
  }

  ngOnInit(): void {
    if(!this.set) { this.getSet(); }
  }

  ngOnChanges() {
    this.setForm.reset({
      title: this.set.title,
      tags: this.set.tags.join(' ')
    })
  }

  onSubmit() {
    this.set = this.prepareSaveSet();
    let observable = this.set.id ? 
      this.setService.updateSet(this.set) : 
      this.setService.createSet(this.set);
    observable.subscribe(set => set => this.setSet(set));
  }

  setSet(set: Set) {
    this.set = set;
    this.revert();
  }

  revert() { this.ngOnChanges(); }

  prepareSaveSet(): Set {
    const formModel = this.setForm.value;
    
    const saveSet: Set = {
      id: this.set.id,
      title: formModel.title as string,
      tags: formModel.tags.split(/\s/) as string[]
    };
    return saveSet;
  }

  getSet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // return a new set obj if the id is 0
    if (id === 0) { this.set = new Set(); return; }
    this.setService.getSet(id)
      .subscribe(set => this.setSet(set));
  }
}