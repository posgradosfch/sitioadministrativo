import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarConsolidadoComponent } from './generar-consolidado.component';

describe('GenerarConsolidadoComponent', () => {
  let component: GenerarConsolidadoComponent;
  let fixture: ComponentFixture<GenerarConsolidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarConsolidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
