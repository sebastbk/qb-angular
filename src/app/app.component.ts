import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="d-flex flex-column" style="height: 100vh;"> 
      <app-nav></app-nav>
      <div class="col">
        <router-outlet></router-outlet>
      </div>
      <div class="d-flex justify-content-around font-weight-bold text-secondary mb-5">
        <span>&copy; 2017</span>
        <span>Keifer Sebastian</span>
      </div>
    </div>
  `,
})
export class AppComponent  { name = 'Angular'; }
