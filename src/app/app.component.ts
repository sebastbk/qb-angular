import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <div class="d-flex justify-content-around font-weight-bold text-secondary mt-3 mb-4">
      <span>&copy; 2017</span>
      <span>Keifer Sebastian</span>
    </div>
  `,
})
export class AppComponent  { name = 'Angular'; }
