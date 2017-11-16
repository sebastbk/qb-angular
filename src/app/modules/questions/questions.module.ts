import { NgModule } from '@angular/core';

// shared
import { SharedModule } from '@shared/shared.module';

// routing
import { QuestionsRoutingModule } from './questions-routing.module';

// components
import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

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
})
export class QuestionsModule { }
