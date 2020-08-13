import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInscripcionCanceladaComponent } from './detalle-inscripcion-cancelada.component';

describe('DetalleInscripcionCanceladaComponent', () => {
  let component: DetalleInscripcionCanceladaComponent;
  let fixture: ComponentFixture<DetalleInscripcionCanceladaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInscripcionCanceladaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInscripcionCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
