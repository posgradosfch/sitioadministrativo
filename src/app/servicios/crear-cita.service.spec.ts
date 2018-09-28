import { TestBed, inject } from '@angular/core/testing';

import { CrearCitaService } from './crear-cita.service';

describe('CrearCitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearCitaService]
    });
  });

  it('should be created', inject([CrearCitaService], (service: CrearCitaService) => {
    expect(service).toBeTruthy();
  }));
});
