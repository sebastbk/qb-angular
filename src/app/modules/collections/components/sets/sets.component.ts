import { Component, OnInit } from '@angular/core';

import { Set } from '../../models/set';
import { SetService } from '../../services/set.service';

@Component({
  selector: 'qb-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  sets: Set[];

  constructor(private setService: SetService) { }

  ngOnInit() {
    this.setService.getSets()
      .then(sets => this.sets = sets);
  }

}
