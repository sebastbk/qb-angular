import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Button } from '../dialog.service';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() buttons: Button[];

  constructor(public activeModal: NgbActiveModal) { }

}
