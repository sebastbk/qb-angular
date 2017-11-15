import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Collection, CollectionService } from '../../../core/services/collection.service';

@Injectable()
export class CollectionDetailsResolver implements Resolve<Collection> {

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection> {
    let id = +route.paramMap.get('id');

    return this.collectionService.getCollection(id).map(collection => {
      if (collection) {
        return collection;
      } else {
        this.router.navigate(['/collections']);
        return null;
      }
    });
  }

}
