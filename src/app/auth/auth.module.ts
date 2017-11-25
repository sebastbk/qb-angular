import { NgModule, ModuleWithProviders } from '@angular/core';

// shared
import { SharedModule } from '@qb/shared/shared.module';

// routing
import { AuthRoutingModule } from './auth-routing.module';

// services
import { AuthService } from './shared/auth.service';

// guards
import { AuthGuard } from './shared/auth-guard.service';
import { AdminGuard } from './shared/admin-guard.service';

// components
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    ForbiddenComponent
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        AdminGuard
      ]
    };
  }
}
