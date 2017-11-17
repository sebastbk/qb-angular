import { TestBed, inject } from '@angular/core/testing';

import { CollectionDetailResolver } from './collection-detail-resolver.service';

describe('CollectionDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionDetailResolver]
    });
  });

  it('should be created', inject([CollectionDetailResolver], (service: CollectionDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});
