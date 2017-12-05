import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/shared/auth-interceptor.service';
import { QuestionsModule } from './questions/questions.module';
import { CollectionsModule } from './collections/collections.module';
import { TagsModule } from './tags/tags.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    CoreModule,
    AuthModule.forRoot(),
    QuestionsModule,
    CollectionsModule,
    TagsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
