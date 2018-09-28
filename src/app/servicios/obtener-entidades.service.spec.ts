import { TestBed, inject } from '@angular/core/testing';

import { ObtenerEntidadesService } from './obtener-entidades.service';

describe('ObtenerEntidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObtenerEntidadesService]
    });
  });

  it('should be created', inject([ObtenerEntidadesService], (service: ObtenerEntidadesService) => {
    expect(service).toBeTruthy();
  }));
});
