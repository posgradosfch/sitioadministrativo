import { TestBed, inject } from '@angular/core/testing';

import { AspiranteService } from './aspirante.service';

describe('AspiranteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AspiranteService]
    });
  });

  it('should be created', inject([AspiranteService], (service: AspiranteService) => {
    expect(service).toBeTruthy();
  }));
});
