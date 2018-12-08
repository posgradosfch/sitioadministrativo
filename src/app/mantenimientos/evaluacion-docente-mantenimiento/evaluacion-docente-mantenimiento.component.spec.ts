import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionDocenteMantenimientoComponent } from './evaluacion-docente-mantenimiento.component';

describe('EvaluacionDocenteMantenimientoComponent', () => {
  let component: EvaluacionDocenteMantenimientoComponent;
  let fixture: ComponentFixture<EvaluacionDocenteMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionDocenteMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionDocenteMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
