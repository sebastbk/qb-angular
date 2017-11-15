import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { QuestionService } from './services/question.service';
import { CollectionService } from './services/collection.service';
import { TagService } from './services/tag.service';
import { PostService } from './services/post.service';

@NgModule({
  providers: [
    QuestionService,
    CollectionService,
    TagService,
    PostService,
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
      ]
    }
  }
}
