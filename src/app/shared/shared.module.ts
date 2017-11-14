import { NgModule, ModuleWithProviders } from '@angular/core';
import { AgePipe } from './pipes/age.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';


@NgModule({
  imports: [],
  exports: [
    AgePipe,
    PluralizePipe,
  ],
  declarations: [
    AgePipe,
    PluralizePipe
  ]
})
export class SharedModule { }
