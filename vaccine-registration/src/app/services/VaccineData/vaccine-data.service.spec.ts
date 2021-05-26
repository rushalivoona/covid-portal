import { TestBed } from '@angular/core/testing';

import { VaccineDataService } from './vaccine-data.service';

describe('VaccineDataService', () => {
  let service: VaccineDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
