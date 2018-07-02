import { TestBed, inject } from '@angular/core/testing';

import { ConsultarCodigosService } from './consultar-codigos.service';

describe('ConsultarCodigosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultarCodigosService]
    });
  });

  it('should be created', inject([ConsultarCodigosService], (service: ConsultarCodigosService) => {
    expect(service).toBeTruthy();
  }));
});
