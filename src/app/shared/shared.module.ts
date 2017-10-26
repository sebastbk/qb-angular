import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgePipe } from './pipes/age.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AgePipe,
    PluralizePipe,
  ],
  declarations: [AgePipe, PluralizePipe]
})
export class SharedModule { }
