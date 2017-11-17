import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { NewsComponent } from './news.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { PostService } from './shared/post.service';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
  ],
  declarations: [
    NewsComponent,
    PostDetailComponent,
    PostListComponent,
  ],
  providers: [
    PostService,
  ]
})
export class NewsModule { }
