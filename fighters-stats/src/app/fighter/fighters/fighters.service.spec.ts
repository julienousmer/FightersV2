import { TestBed } from '@angular/core/testing';

import { FightersService } from './fighters.service';

describe('FighterService', () => {
  let service: FightersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
