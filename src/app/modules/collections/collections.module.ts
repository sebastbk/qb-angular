import { NgModule } from '@angular/core';

// shared
import { SharedModule } from '@shared/shared.module';

// routing
import { CollectionsRoutingModule } from './collections-routing.module';

// collections
import { CollectionsComponent } from './collections.component';
import { CollectionSearchComponent } from './components/collection-search/collection-search.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';

@NgModule({
  imports: [
    SharedModule,
    CollectionsRoutingModule,
  ],
  declarations: [
    CollectionsComponent,
    CollectionSearchComponent,
    CollectionDetailsComponent,
  ],
})
export class CollectionsModule { }
