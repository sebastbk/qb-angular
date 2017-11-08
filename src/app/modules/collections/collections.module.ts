import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';

import { CollectionsRoutingModule } from './collections-routing.module';

import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './components/collection-search/collection-search.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';

import { CollectionService } from './services/collection.service';
import { TagService } from '../tags/services/tag.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CollectionsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CollectionsComponent,
    CollectionSearchComponent,
    CollectionDetailsComponent,
  ],
  providers: [
    CollectionService,
    TagService,
  ]
})
export class CollectionsModule { }
