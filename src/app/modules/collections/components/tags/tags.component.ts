import { Component, OnInit } from '@angular/core';

import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'qb-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags()
      .then(tags => this.tags = tags);
  }

}
