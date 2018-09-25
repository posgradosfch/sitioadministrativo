import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoProcedimientosService } from './mantenimiento-procedimientos.service';

describe('MantenimientoProcedimientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoProcedimientosService]
    });
  });

  it('should be created', inject([MantenimientoProcedimientosService], (service: MantenimientoProcedimientosService) => {
    expect(service).toBeTruthy();
  }));
});
