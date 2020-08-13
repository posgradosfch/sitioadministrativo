import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoMateriasService } from './mantenimiento-materias.service';

describe('MantenimientoMateriasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoMateriasService]
    });
  });

  it('should be created', inject([MantenimientoMateriasService], (service: MantenimientoMateriasService) => {
    expect(service).toBeTruthy();
  }));
});
