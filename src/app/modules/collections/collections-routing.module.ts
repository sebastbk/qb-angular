import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';

const routes: Routes = [
  { path: '', component: CollectionsComponent,
    children: [
      { path: 'questions', loadChildren: 'app/modules/questions/questions.module#QuestionsModule' },
      { path: 'sets', loadChildren: 'app/modules/sets/sets.module#SetsModule' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
