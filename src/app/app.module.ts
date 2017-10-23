import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }            from './app.component';
import { NavComponent }            from './nav.component';
import { HomeComponent }           from './home.component';
import { NewsComponent }           from './news.component';
import { PostService }             from './posts/post.service';
import { PostListComponent }       from './posts/post-list.component';
import { PostDetailComponent }     from './posts/post-detail.component';
import { QuestionService }         from './questions/question.service';
import { QuestionSearchComponent } from './questions/question-search.component';
import { QuestionListComponent }   from './questions/question-list.component';
import { QuestionDetailComponent } from './questions/question-detail.component';
import { SetService}               from './sets/set.service';
import { SetQuestionService }      from './sets/set-question.service';
import { SetListComponent }        from './sets/set-list.component';
import { SetDetailComponent }      from './sets/set-detail.component';

import { AgePipe }       from './pipes/age.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [ 
    AppComponent,
    NavComponent,
    HomeComponent,
    NewsComponent,
    PostListComponent,
    PostDetailComponent,
    QuestionSearchComponent,
    QuestionListComponent,
    QuestionDetailComponent,
    SetListComponent,
    SetDetailComponent,
    AgePipe,
    PluralizePipe,
  ],
  providers: [
    PostService,
    QuestionService,
    SetService,
    SetQuestionService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
