import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  { name = 'Angular'; }
