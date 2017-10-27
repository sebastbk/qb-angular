import { Component, OnInit } from '@angular/core';

import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'qb-set-search',
  templateUrl: './set-search.component.html',
  styleUrls: ['./set-search.component.scss']
})
export class SetSearchComponent implements OnInit {
  tags: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags()
      .then(tags => this.tags = tags.slice(0, 20));
  }

}
