import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// pipes
import { AgePipe } from './pipes/age.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';

// directives
import { AutofocusDirective } from './autofocus.directive';


@NgModule({
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgePipe,
    PluralizePipe,
    AutofocusDirective,
  ],
  declarations: [
    AgePipe,
    PluralizePipe,
    AutofocusDirective,
  ]
})
export class SharedModule { }
