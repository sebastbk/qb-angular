import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavRootComponent } from './nav-root/nav-root.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    NavRootComponent
  ],
  exports: [
    NavRootComponent
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
