import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

import { QuestionService } from './services/question.service';
import { QuestionDetailsService } from './services/question-details.service';
import { TagService } from '../tags/services/tag.service';

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
  exports: [
    QuestionListComponent,
  ],
  declarations: [
    QuestionsComponent,
    QuestionListComponent,
    QuestionSearchComponent,
    QuestionDetailsComponent,
  ],
  providers: [
    QuestionDetailsService,
    QuestionService,
    TagService,
  ]
})
export class QuestionsModule { }
