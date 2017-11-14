import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { NewsComponent } from './news.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
  ],
  declarations: [
    NewsComponent,
    PostDetailsComponent,
    PostListComponent,
  ]
})
export class NewsModule { }
