import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleInscripcionComponent } from './ver-detalle-inscripcion.component';

describe('VerDetalleInscripcionComponent', () => {
  let component: VerDetalleInscripcionComponent;
  let fixture: ComponentFixture<VerDetalleInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
