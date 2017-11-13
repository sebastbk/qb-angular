import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'questions', 
    loadChildren: 'app/modules/questions/questions.module#QuestionsModule'
  },
  { 
    path: 'collections',
    loadChildren: 'app/modules/collections/collections.module#CollectionsModule'
  },
  {
    path: 'news',
    loadChildren: 'app/modules/news/news.module#NewsModule'
  },
  { path: '', redirectTo: '/news', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true, // debug
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
