import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoDescuentosService } from './mantenimiento-descuentos.service';

describe('MantenimientoDescuentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoDescuentosService]
    });
  });

  it('should be created', inject([MantenimientoDescuentosService], (service: MantenimientoDescuentosService) => {
    expect(service).toBeTruthy();
  }));
});
