import { TestBed, inject } from '@angular/core/testing';

import { GetprofileService } from './getprofile.service';

describe('GetprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetprofileService]
    });
  });

  it('should be created', inject([GetprofileService], (service: GetprofileService) => {
    expect(service).toBeTruthy();
  }));
});
