import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProcedimientoComponent } from './agregar-editar-procedimiento.component';

describe('AgregarEditarProcedimientoComponent', () => {
  let component: AgregarEditarProcedimientoComponent;
  let fixture: ComponentFixture<AgregarEditarProcedimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarProcedimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
