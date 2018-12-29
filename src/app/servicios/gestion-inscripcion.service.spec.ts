import { TestBed, inject } from '@angular/core/testing';

import { GestionInscripcionService } from './gestion-inscripcion.service';

describe('GestionInscripcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionInscripcionService]
    });
  });

  it('should be created', inject([GestionInscripcionService], (service: GestionInscripcionService) => {
    expect(service).toBeTruthy();
  }));
});
