import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { CollectionsRoutingModule } from './collections-routing.module';

import { CollectionsComponent } from './collections.component';
import { CollectionsNavComponent } from './components/collections-nav/collections-nav.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule,
    HttpModule,
    NgbModule
  ],
  declarations: [
    CollectionsNavComponent,
    CollectionsComponent,
  ],
  providers: [
  ]
})
export class CollectionsModule { }
