import { TestBed } from '@angular/core/testing';

import { MaestrosService } from './maestros.service';

describe('MaestrosService', () => {
  let service: MaestrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaestrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
