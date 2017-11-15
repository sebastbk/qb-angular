import { TestBed, inject } from '@angular/core/testing';

import { CollectionDetailsResolverService } from './collection-details-resolver.service';

describe('CollectionDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionDetailsResolverService]
    });
  });

  it('should be created', inject([CollectionDetailsResolverService], (service: CollectionDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
