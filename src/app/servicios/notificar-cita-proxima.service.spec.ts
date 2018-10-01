import { TestBed, inject } from '@angular/core/testing';

import { NotificarCitaProximaService } from './notificar-cita-proxima.service';

describe('NotificarCitaProximaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificarCitaProximaService]
    });
  });

  it('should be created', inject([NotificarCitaProximaService], (service: NotificarCitaProximaService) => {
    expect(service).toBeTruthy();
  }));
});
