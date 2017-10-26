import { Component, Input } from '@angular/core';
// import { Router }           from '@angular/router';

import { Set } from '../../models/set';

@Component({
  selector: 'qb-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent {
  @Input() sets: Set[];
  public selectedSet: Set;

  // constructor(private router: Router) {}

  setSelected(post: Set): void {
    this.selectedSet = post;
  }

  ngOnChanges(): void {
    if (!this.selectedSet && this.sets)
      this.selectedSet = this.sets[0]
  }

  // gotoDetail(set: Set): void {
  //   this.router.navigate(['/sets/', set.id]);
  // }
}