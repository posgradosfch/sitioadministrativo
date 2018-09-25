import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosMantenimientoComponent } from './procedimientos-mantenimiento.component';

describe('ProcedimientosMantenimientoComponent', () => {
  let component: ProcedimientosMantenimientoComponent;
  let fixture: ComponentFixture<ProcedimientosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimientosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
