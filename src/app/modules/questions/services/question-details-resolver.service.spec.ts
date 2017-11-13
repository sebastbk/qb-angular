import { TestBed, inject } from '@angular/core/testing';

import { QuestionDetailsResolverService } from './question-details-resolver.service';

describe('QuestionDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionDetailsResolverService]
    });
  });

  it('should be created', inject([QuestionDetailsResolverService], (service: QuestionDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
