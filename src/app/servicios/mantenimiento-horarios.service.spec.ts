import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoHorariosService } from './mantenimiento-horarios.service';

describe('MantenimientoHorariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoHorariosService]
    });
  });

  it('should be created', inject([MantenimientoHorariosService], (service: MantenimientoHorariosService) => {
    expect(service).toBeTruthy();
  }));
});
