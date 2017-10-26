import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

import { Set } from '../../models/set';

@Component({
  selector: 'qb-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.scss']
})
export class SetDetailComponent {
  @Input() set: Set;
}