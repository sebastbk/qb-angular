import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class Button {
  name: string;
  result: any;
}

export class DialogContent {
  title?: string;
  message: string;
  buttons?: Button[];
  center?: boolean;
}

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent {
  @Input() content: DialogContent;

  constructor(public activeModal: NgbActiveModal) { }

}
