import { TestBed, inject } from '@angular/core/testing';

import { ConsultarPagoService } from './consultar-pago.service';

describe('ConsultarPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultarPagoService]
    });
  });

  it('should be created', inject([ConsultarPagoService], (service: ConsultarPagoService) => {
    expect(service).toBeTruthy();
  }));
});
