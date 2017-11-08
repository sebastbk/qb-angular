import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CollectionsRoutingModule } from './collections-routing.module';

import { CollectionsComponent } from './collections.component';
import { CollectionsNavComponent } from './components/collections-nav/collections-nav.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    NgbModule
  ],
  declarations: [
    CollectionsComponent,
    CollectionsNavComponent,
  ],
  providers: [
  ]
})
export class CollectionsModule { }
