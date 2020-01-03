import { TestBed, inject } from '@angular/core/testing';

import { EstudiantesService } from './estudiantes.service';

describe('EstudiantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstudiantesService]
    });
  });

  it('should be created', inject([EstudiantesService], (service: EstudiantesService) => {
    expect(service).toBeTruthy();
  }));
});
