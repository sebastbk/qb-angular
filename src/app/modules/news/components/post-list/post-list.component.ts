import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable }      from 'rxjs/Observable';

import { Post, PostService } from '@core/services/post.service';

@Component({
  selector: 'qb-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts$: Observable<Post[]>;

  constructor (private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }
}
