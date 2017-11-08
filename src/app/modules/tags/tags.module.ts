import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { TagService } from './services/tag.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [],
  providers: [ TagService ]
})
export class TagsModule { }
