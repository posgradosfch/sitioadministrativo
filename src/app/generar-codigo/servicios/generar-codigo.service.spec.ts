import { TestBed, inject } from '@angular/core/testing';

import { GenerarCodigoService } from './generar-codigo.service';

describe('GenerarCodigoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerarCodigoService]
    });
  });

  it('should be created', inject([GenerarCodigoService], (service: GenerarCodigoService) => {
    expect(service).toBeTruthy();
  }));
});
