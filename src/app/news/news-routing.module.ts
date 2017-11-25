import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { NewsComponent } from './news.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

// guards
import { AuthGuard } from '@qb/auth/shared/auth-guard.service';
import { AdminGuard } from '@qb/auth/shared/admin-guard.service';

const routes: Routes = [
  {
    path: '', component: NewsComponent,
    children: [
      { path: '', component: PostListComponent },
      {
        path: 'new',
        component: PostDetailComponent,
        canActivate: [
          AuthGuard,
          AdminGuard
        ]
      },
      { path: ':id', component: PostDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
