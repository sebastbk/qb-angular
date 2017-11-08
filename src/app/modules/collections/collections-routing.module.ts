import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { SetsComponent } from './components/sets/sets.component';
import { SetSearchComponent } from './components/set-search/set-search.component';
import { SetDetailComponent } from './components/set-detail/set-detail.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  { path: '', component: CollectionsComponent,
    children: [
      { path: 'questions', loadChildren: 'app/modules/questions/questions.module#QuestionsModule' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
