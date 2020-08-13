import { TestBed, inject } from '@angular/core/testing';

import { GenerarConsolidadoService } from './generar-consolidado.service';

describe('GenerarConsolidadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerarConsolidadoService]
    });
  });

  it('should be created', inject([GenerarConsolidadoService], (service: GenerarConsolidadoService) => {
    expect(service).toBeTruthy();
  }));
});
