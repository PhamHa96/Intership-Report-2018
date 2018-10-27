import { TestBed, inject } from '@angular/core/testing';

import { QuanAnService } from './quan-an.service';
describe('QuanAnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuanAnService]
    });
  });

  it('should be created', inject([QuanAnService], (service: QuanAnService) => {
    expect(service).toBeTruthy();
  }));
});
