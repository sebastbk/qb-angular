import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }           from './home.component';
import { QuestionSearchComponent } from './question-search.component';
import { QuestionDetailComponent } from './question-detail.component';
import { PostDetailComponent }     from './post-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions',     component: QuestionSearchComponent },
  { path: 'questions/:id', component: QuestionDetailComponent },
  { path: 'posts/:id',     component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
  HomeComponent,
  QuestionSearchComponent,
  QuestionDetailComponent
];