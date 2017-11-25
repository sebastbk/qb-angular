import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../shared/post.model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'qb-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === 0) {
      this.post = new Post();
      return;
    }
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }
}
