import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

const routes: Routes = [
  {
    path: '', component: QuestionsComponent,
    children: [
      { path: '', component: QuestionSearchComponent },
      { path: 'new', component: QuestionDetailsComponent },
      { path: ':id', component: QuestionDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
