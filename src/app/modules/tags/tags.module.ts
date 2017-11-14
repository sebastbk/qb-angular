import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagService } from './services/tag.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [ TagService ]
})
export class TagsModule { }
