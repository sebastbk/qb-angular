import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { CollectionsRoutingModule } from './collections-routing.module';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { SetDetailComponent } from './components/set-detail/set-detail.component';
import { SetListComponent } from './components/set-list/set-list.component';
import { SetsComponent } from './components/sets/sets.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagsComponent } from './components/tags/tags.component';
import { CollectionsComponent } from './collections.component';
import { CollectionsNavComponent } from './components/collections-nav/collections-nav.component';
import { CardsComponent } from './components/cards/cards.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { SetSearchComponent } from './components/set-search/set-search.component';

import { QuestionService } from './services/question.service';
import { QuestionSearchService } from './services/question-search.service';
import { SetService } from './services/set.service';
import { TagService } from './services/tag.service';
import { TagSearchService } from './services/tag-search.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CollectionsRoutingModule,
    SharedModule,
    HttpModule,
    NgbModule
  ],
  declarations: [
    QuestionDetailComponent,
    QuestionListComponent,
    SetDetailComponent,
    SetListComponent,
    SetsComponent,
    QuestionsComponent,
    TagListComponent,
    TagsComponent,
    CollectionsNavComponent,
    CollectionsComponent,
    CardsComponent,
    QuestionSearchComponent,
    SetSearchComponent,
  ],
  providers: [
    QuestionService,
    QuestionSearchService,
    SetService,
    TagService,
    TagSearchService
  ]
})
export class CollectionsModule { }
