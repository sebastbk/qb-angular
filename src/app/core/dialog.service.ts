import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DialogComponent } from './dialog/dialog.component';

export class Button {
  name: string;
  result: any;
}

const ok: Button = {
  name: 'Ok',
  result: true
};

const cancel: Button = {
  name: 'Cancel',
  result: false
};

@Injectable()
export class DialogService {

  constructor(private modalService: NgbModal) { }

  confirm(message?: string): Promise<boolean> {
    const modalRef = this.modalService.open(DialogComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      windowClass: 'mt-6'
    });
    modalRef.componentInstance.message = message || 'Are you sure?';
    modalRef.componentInstance.buttons = [ok, cancel];
    return modalRef.result;
  }

}
