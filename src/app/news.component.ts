import { Component, OnInit } from '@angular/core';

import { Post }            from './posts/post';
import { PostService }     from './posts/post.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html'
})

export class NewsComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .then(posts => this.posts = posts.slice(0, 3));
  }
}