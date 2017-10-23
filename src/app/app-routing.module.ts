import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }           from './home.component';
import { QuestionSearchComponent } from './questions/question-search.component';
import { QuestionDetailComponent } from './questions/question-detail.component';
import { PostDetailComponent }     from './posts/post-detail.component';
import { SetDetailComponent }      from './sets/set-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions',     component: QuestionSearchComponent },
  { path: 'questions/:id', component: QuestionDetailComponent },
  { path: 'posts/:id',     component: PostDetailComponent },
  { path: 'sets/:id',      component: SetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
  HomeComponent,
  QuestionSearchComponent,
  QuestionDetailComponent,
  PostDetailComponent,
  SetDetailComponent,
];