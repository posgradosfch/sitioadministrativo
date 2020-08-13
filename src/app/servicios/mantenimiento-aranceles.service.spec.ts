import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoArancelesService } from './mantenimiento-aranceles.service';

describe('MantenimientoArancelesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoArancelesService]
    });
  });

  it('should be created', inject([MantenimientoArancelesService], (service: MantenimientoArancelesService) => {
    expect(service).toBeTruthy();
  }));
});
