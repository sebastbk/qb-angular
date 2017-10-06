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
import { QuestionService }         from './question.service';
import { QuestionSearchComponent } from './question-search.component';
import { QuestionListComponent }   from './question-list.component';

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
    QuestionSearchComponent,
    QuestionListComponent,
  ],
  providers: [
    PostService,
    QuestionService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
