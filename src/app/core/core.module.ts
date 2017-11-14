import { NgModule } from '@angular/core';

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
export class CoreModule { }
