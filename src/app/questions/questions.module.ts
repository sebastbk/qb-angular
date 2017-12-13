import { NgModule } from '@angular/core';

// shared
import { SharedModule } from '@qb/shared/shared.module';

// routing
import { QuestionsRoutingModule } from './questions-routing.module';

// components
import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionListComponent } from './shared/question-list/question-list.component';

// services
import { QuestionService } from './shared/question.service';

@NgModule({
  imports: [
    SharedModule,
    QuestionsRoutingModule,
  ],
  declarations: [
    QuestionsComponent,
    QuestionSearchComponent,
    QuestionDetailComponent,
    QuestionListComponent,
  ],
  providers: [
    QuestionService,
  ]
})
export class QuestionsModule { }
