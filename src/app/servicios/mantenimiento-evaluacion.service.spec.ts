import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoEvaluacionService } from './mantenimiento-evaluacion.service';

describe('MantenimientoEvaluacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoEvaluacionService]
    });
  });

  it('should be created', inject([MantenimientoEvaluacionService], (service: MantenimientoEvaluacionService) => {
    expect(service).toBeTruthy();
  }));
});
