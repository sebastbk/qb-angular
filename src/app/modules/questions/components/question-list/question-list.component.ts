import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qb-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input() questions;

  constructor() { }

  ngOnInit() {
  }

}
