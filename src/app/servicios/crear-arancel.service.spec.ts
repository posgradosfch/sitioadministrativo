import { TestBed, inject } from '@angular/core/testing';

import { CrearArancelService } from './crear-arancel.service';

describe('CrearArancelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearArancelService]
    });
  });

  it('should be created', inject([CrearArancelService], (service: CrearArancelService) => {
    expect(service).toBeTruthy();
  }));
});
