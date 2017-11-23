import { Injectable } from '@angular/core';

import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DialogComponent, DialogContent, Button } from './dialog/dialog.component';

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

  open(content: any, options?: NgbModalOptions): NgbModalRef {
    return this.modalService.open(content, options);
  }

  openDialog(content: DialogContent, options?: NgbModalOptions): Promise<any> {
    const modalRef = this.open(DialogComponent, options);
    modalRef.componentInstance.content = content;
    return modalRef.result;
  }

  confirm(message?: string): Promise<boolean> {
    const content = {
      message: message || 'Are you sure?',
      buttons: [ok, cancel],
      center: true
    };
    return this.openDialog(content, { size: 'sm', windowClass: 'mt-6' })
      .then((result) => result, () => false);
  }
}
