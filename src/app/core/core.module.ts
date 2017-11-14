import { NgModule } from '@angular/core';

import { TagService } from './services/tag.service';

@NgModule({
  providers: [
    TagService,
  ]
})
export class CoreModule { }
