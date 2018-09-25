import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoPasosService } from './mantenimiento-pasos.service';

describe('MantenimientoPasosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoPasosService]
    });
  });

  it('should be created', inject([MantenimientoPasosService], (service: MantenimientoPasosService) => {
    expect(service).toBeTruthy();
  }));
});
