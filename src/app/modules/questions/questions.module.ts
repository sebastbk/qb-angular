import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    QuestionsRoutingModule,
  ],
  exports: [
    QuestionListComponent,
  ],
  declarations: [
    QuestionsComponent,
    QuestionListComponent,
    QuestionSearchComponent,
    QuestionDetailsComponent,
  ],
})
export class QuestionsModule { }
