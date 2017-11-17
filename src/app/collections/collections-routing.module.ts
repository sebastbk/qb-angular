import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './collection-search/collection-search.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

import { CollectionDetailResolver } from './collection-detail-resolver.service'; 

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
        component: CollectionDetailComponent,
        resolve: {
          collection: CollectionDetailResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CollectionDetailResolver
  ]
})
export class CollectionsRoutingModule { }
