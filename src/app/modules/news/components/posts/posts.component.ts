import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'qb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .then(posts => this.posts = posts);
  }

}
