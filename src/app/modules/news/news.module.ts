import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { NewsRoutingModule } from './news-routing.module';

import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsComponent } from './components/posts/posts.component';

import { PostService } from './services/post.service';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpModule,
  ],
  declarations: [
    PostDetailComponent,
    PostListComponent,
    PostsComponent,
  ],
  providers: [
    PostService,
  ]
})
export class NewsModule { }
