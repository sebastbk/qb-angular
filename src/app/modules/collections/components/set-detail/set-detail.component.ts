import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Set } from '../../models/set';
import { SetService } from '../../services/set.service';

@Component({
  selector: 'qb-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.scss']
})
export class SetDetailComponent implements OnInit {
  set: Set;

  constructor(
    private route: ActivatedRoute,
    private setService: SetService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.setService.getSet(+params.get('id')))
      .subscribe(set => this.set = set)
  }
}