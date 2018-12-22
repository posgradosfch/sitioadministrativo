import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoAulasService } from './mantenimiento-aulas.service';

describe('MantenimientoAulasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoAulasService]
    });
  });

  it('should be created', inject([MantenimientoAulasService], (service: MantenimientoAulasService) => {
    expect(service).toBeTruthy();
  }));
});
