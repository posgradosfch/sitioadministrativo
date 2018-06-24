import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoRolesService } from './mantenimiento-roles.service';

describe('MantenimientoRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoRolesService]
    });
  });

  it('should be created', inject([MantenimientoRolesService], (service: MantenimientoRolesService) => {
    expect(service).toBeTruthy();
  }));
});
