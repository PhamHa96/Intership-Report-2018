import { TestBed, inject } from '@angular/core/testing';

import { TypeFoodService } from './type-food.service';

describe('TypeFoodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeFoodService]
    });
  });

  it('should be created', inject([TypeFoodService], (service: TypeFoodService) => {
    expect(service).toBeTruthy();
  }));
});
