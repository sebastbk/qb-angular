import { Component, Input } from '@angular/core';

import { Tag } from '../../models/tag';

@Component({
  selector: 'qb-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {
  @Input() tags: Tag[];
}
