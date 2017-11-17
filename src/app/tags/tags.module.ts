import { NgModule } from '@angular/core';

import { Tag } from './shared/tag.model';
import { TagService } from './shared/tag.service';

@NgModule({
  providers: [
    TagService
  ]
})
export class TagsModule { }
