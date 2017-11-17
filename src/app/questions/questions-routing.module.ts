import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

import { QuestionDetailResolver } from './question-detail-resolver.service';

const routes: Routes = [
  {
    path: 'questions', component: QuestionsComponent,
    children: [
      {
        path: '',
        component: QuestionSearchComponent,
      },
      {
        path: 'new',
        component: QuestionDetailComponent,
      },
      {
        path: ':id', 
        component: QuestionDetailComponent,
        resolve: {
          question: QuestionDetailResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    QuestionDetailResolver
  ]
})
export class QuestionsRoutingModule { }
