import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  {
    path: 'news',
    loadChildren: '@qb/news/news.module#NewsModule'
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
