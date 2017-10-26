import { Component, Input, OnChanges } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'qb-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnChanges {
  @Input() posts: Post[];
  public selectedPost: Post;

  setSelected(post: Post): void {
    this.selectedPost = post;
  }

  ngOnChanges(): void {
    if (!this.selectedPost && this.posts)
      this.selectedPost = this.posts[0]
  }
}
