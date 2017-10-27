import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { CardsComponent } from './components/cards/cards.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionSearchComponent } from './components/question-search/question-search.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { SetsComponent } from './components/sets/sets.component';
import { SetDetailComponent } from './components/set-detail/set-detail.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  { path: 'collections', component: CollectionsComponent,
    children: [
      { path: '', component: CardsComponent },
      { path: 'questions', component: QuestionsComponent,
        children: [
          { path: '', component: QuestionSearchComponent },
          { path: ':id', component: QuestionDetailComponent }
        ]
      },
      { path: 'sets', component: SetsComponent,
        children: [
          { path: ':id', component: SetDetailComponent }
        ]
      },
      { path: 'tags', component: TagsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
