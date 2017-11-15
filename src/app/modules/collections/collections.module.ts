import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';
import { QuestionsModule } from '../questions/questions.module';

import { CollectionsRoutingModule } from './collections-routing.module';

import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './components/collection-search/collection-search.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    QuestionsModule,
    CollectionsRoutingModule,
  ],
  declarations: [
    CollectionsComponent,
    CollectionSearchComponent,
    CollectionDetailsComponent,
  ],
})
export class CollectionsModule { }
