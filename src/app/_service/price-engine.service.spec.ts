import { TestBed } from '@angular/core/testing';

import { PriceEngineService } from './price-engine.service';

describe('PriceEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceEngineService = TestBed.get(PriceEngineService);
    expect(service).toBeTruthy();
  });
});
