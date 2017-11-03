import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './mocks/in-memory-data-service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { SharedModule } from './shared/shared.module';
import { NewsModule } from './modules/news/news.module';
import { CollectionsModule } from './modules/collections/collections.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    NewsModule,
    CollectionsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
