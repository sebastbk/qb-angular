import { NgModule } from '@angular/core';

// shared
import { SharedModule } from '@shared/shared.module';

// routing
import { QuestionsRoutingModule } from './questions-routing.module';

// components
import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

// services
import { QuestionSearchService } from './services/question-search.service';

@NgModule({
  imports: [
    SharedModule,
    QuestionsRoutingModule,
  ],
  declarations: [
    QuestionsComponent,
    QuestionSearchComponent,
    QuestionDetailsComponent,
  ],
  providers: [
    QuestionSearchService
  ]
})
export class QuestionsModule { }
