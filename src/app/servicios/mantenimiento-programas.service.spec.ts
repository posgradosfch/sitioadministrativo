import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoProgramasService } from './mantenimiento-programas.service';

describe('MantenimientoProgramasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoProgramasService]
    });
  });

  it('should be created', inject([MantenimientoProgramasService], (service: MantenimientoProgramasService) => {
    expect(service).toBeTruthy();
  }));
});
