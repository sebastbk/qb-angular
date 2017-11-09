import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'questions', loadChildren: 'app/modules/questions/questions.module#QuestionsModule' },
  { path: 'collections', loadChildren: 'app/modules/collections/collections.module#CollectionsModule' },
  { path: 'news', loadChildren: 'app/modules/news/news.module#NewsModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
