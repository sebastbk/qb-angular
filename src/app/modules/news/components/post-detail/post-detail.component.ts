import { Component, Input } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'qb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  @Input() post: Post;
}
