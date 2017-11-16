import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgePipe } from './pipes/age.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';


@NgModule({
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgePipe,
    PluralizePipe,
  ],
  declarations: [
    AgePipe,
    PluralizePipe
  ]
})
export class SharedModule { }
