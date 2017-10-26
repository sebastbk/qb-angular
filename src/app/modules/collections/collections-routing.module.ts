import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SetsComponent } from './components/sets/sets.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  { path: 'collections', component: CollectionsComponent },
  { path: 'collections/questions', component: QuestionsComponent },
  { path: 'collections/sets', component: SetsComponent },
  { path: 'collections/tags', component: TagsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
