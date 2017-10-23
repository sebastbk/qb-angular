import { Component, OnInit, Input } from '@angular/core';
import { Router }                   from '@angular/router';

import { Post } from './post';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  @Input() posts: Post[];

  constructor(private router: Router) {}

  gotoDetail(post: Post): void {
    this.router.navigate(['/posts/', post.id]);
  }
}