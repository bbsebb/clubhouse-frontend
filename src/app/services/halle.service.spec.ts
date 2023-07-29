import { TestBed } from '@angular/core/testing';

import { HalleService } from './halle.service';

describe('HalleService', () => {
  let service: HalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
