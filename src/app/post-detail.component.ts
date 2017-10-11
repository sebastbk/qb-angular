import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { PostService } from './post.service'
import { Post }        from './post';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styles: [`
    label {
      font-weight: bold;
      text-transform: capitalize;
    }
    label::after {
      content: ":";
      margin-right: 1em;
    }
  `]
})

export class PostDetailComponent implements OnInit {
  post: Post;
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.postService.getPost(+params.get('id')))
      .subscribe(post => this.post = post)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.postService.update(this.post)
      .then(() => this.goBack());
  }
}