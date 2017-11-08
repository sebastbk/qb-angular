import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetsComponent } from './sets.component';
import { SetSearchComponent } from './components/set-search/set-search.component';
import { SetDetailsComponent } from './components/set-details/set-details.component';

const routes: Routes = [
  { 
    path: '', component: SetsComponent,
    children: [
      { path: '', component: SetSearchComponent },
      { path: 'new', component: SetDetailsComponent },
      { path: ':id', component: SetDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetsRoutingModule { }
