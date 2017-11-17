import { NgModule } from '@angular/core';

// shared
import { SharedModule } from '@qb/shared/shared.module';

// routing
import { CollectionsRoutingModule } from './collections-routing.module';

// collections
import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './collection-search/collection-search.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

// services
import { CollectionService } from './shared/collection.service';

@NgModule({
  imports: [
    SharedModule,
    CollectionsRoutingModule,
  ],
  declarations: [
    CollectionsComponent,
    CollectionSearchComponent,
    CollectionDetailComponent,
  ],
  providers: [
    CollectionService,
  ]
})
export class CollectionsModule { }
