import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

// resolvers
import { QuestionDetailResolver } from './question-detail-resolver.service';

// guards
import { CanDeactivateGuard } from '@qb/core/can-deactivate-guard.service';
import { AuthGuard } from '@qb/auth/shared/auth-guard.service';

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
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: QuestionDetailComponent,
        canDeactivate: [CanDeactivateGuard],
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
