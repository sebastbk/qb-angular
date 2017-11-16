import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './components/collection-search/collection-search.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';

import { CollectionDetailsResolver } from './services/collection-details-resolver.service'; 

const routes: Routes = [
  { 
    path: 'collections', component: CollectionsComponent,
    children: [
      { 
        path: '',
        component: CollectionSearchComponent
      },
      { 
        path: ':id',
        component: CollectionDetailsComponent,
        resolve: {
          collection: CollectionDetailsResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CollectionDetailsResolver
  ]
})
export class CollectionsRoutingModule { }
