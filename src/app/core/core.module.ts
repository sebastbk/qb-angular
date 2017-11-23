import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

// shared
import { SharedModule } from '@qb/shared/shared.module';

// components
import { NavComponent } from './nav/nav.component';
import { DialogComponent } from './dialog/dialog.component';

// services
import { DialogService } from './dialog.service';

// guards
import { CanDeactivateGuard } from './can-deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [
    NavComponent,
    DialogComponent
  ],
  exports: [
    NavComponent,
  ],
  providers: [
    DialogService,
    CanDeactivateGuard
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
