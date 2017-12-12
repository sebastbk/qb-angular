import { Component } from '@angular/core';

@Component({
  selector: 'qb-root',
  template: `
    <qb-nav></qb-nav>
    <div class="body container bg-white pb-5">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
