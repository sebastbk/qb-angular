import { NgModule } from '@angular/core';

// shared
import { SharedModule } from '@qb/shared/shared.module';

// routing
import { AuthRoutingModule } from './auth-routing.module';

// services
import { AuthService } from './shared/auth.service';

// components
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
