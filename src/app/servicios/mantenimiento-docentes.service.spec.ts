import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoDocentesService } from './mantenimiento-docentes.service';

describe('MantenimientoDocentesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoDocentesService]
    });
  });

  it('should be created', inject([MantenimientoDocentesService], (service: MantenimientoDocentesService) => {
    expect(service).toBeTruthy();
  }));
});
