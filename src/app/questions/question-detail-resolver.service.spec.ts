import { TestBed, inject } from '@angular/core/testing';

import { QuestionDetailResolverService } from './question-detail-resolver.service';

describe('QuestionDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionDetailResolverService]
    });
  });

  it('should be created', inject([QuestionDetailResolverService], (service: QuestionDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
