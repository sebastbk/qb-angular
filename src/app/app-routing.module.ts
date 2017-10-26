import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsModule } from './modules/collections/collections.module';
import { NewsModule } from './modules/news/news.module';

export const routes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
