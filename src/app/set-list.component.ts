import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

import { Set } from './set';

@Component({
  selector: 'set-list',
  templateUrl: './set-list.component.html',
  styles: [`
    .title-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `],
})

export class SetListComponent {
  @Input() sets: Set[];

  constructor(private router: Router) {}

  gotoDetail(set: Set): void {
    this.router.navigate(['/sets/', set.id]);
  }
}