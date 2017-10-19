import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }            from './app.component';
import { NavComponent }            from './nav.component';
import { HomeComponent }           from './home.component';
import { PostService }             from './post.service';
import { PostListComponent }       from './post-list.component';
import { PostDetailComponent }     from './post-detail.component';
import { QuestionService }         from './question.service';
import { QuestionSearchComponent } from './question-search.component';
import { QuestionListComponent }   from './question-list.component';
import { QuestionDetailComponent } from './question-detail.component';
import { SetService}               from './set.service';
import { SetQuestionService }      from './set-question.service';
import { SetListComponent }        from './set-list.component';
import { SetDetailComponent }      from './set-detail.component';

import { AgePipe }       from './age.pipe';
import { PluralizePipe } from './pluralize.pipe';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
  ],
  declarations: [ 
    AppComponent,
    NavComponent,
    HomeComponent,
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
