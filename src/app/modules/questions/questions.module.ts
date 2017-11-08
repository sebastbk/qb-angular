import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

import { QuestionService } from './services/question.service';
import { TagSearchService } from '../collections/services/tag-search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    QuestionsRoutingModule,
    SharedModule,
  ],
  declarations: [
    QuestionsComponent,
    QuestionSearchComponent,
    QuestionDetailsComponent,
  ],
  providers: [
    QuestionService,
    TagSearchService
  ]
})
export class QuestionsModule { }
