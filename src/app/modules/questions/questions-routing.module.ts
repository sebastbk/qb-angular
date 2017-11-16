import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

import { QuestionDetailsResolver } from './services/question-details-resolver.service';

const routes: Routes = [
  {
    path: 'questions', component: QuestionsComponent,
    children: [
      {
        path: '',
        component: QuestionSearchComponent,
      },
      {
        path: ':id', 
        component: QuestionDetailsComponent,
        resolve: {
          question: QuestionDetailsResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    QuestionDetailsResolver
  ]
})
export class QuestionsRoutingModule { }
