import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoNoticiasService } from './mantenimiento-noticias.service';

describe('MantenimientoNoticiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoNoticiasService]
    });
  });

  it('should be created', inject([MantenimientoNoticiasService], (service: MantenimientoNoticiasService) => {
    expect(service).toBeTruthy();
  }));
});
