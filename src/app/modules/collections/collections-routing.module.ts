import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './components/collection-search/collection-search.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';

const routes: Routes = [
  { 
    path: '', component: CollectionsComponent,
    children: [
      { path: '', component: CollectionSearchComponent },
      { path: 'new', component: CollectionDetailsComponent },
      { path: ':id', component: CollectionDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
