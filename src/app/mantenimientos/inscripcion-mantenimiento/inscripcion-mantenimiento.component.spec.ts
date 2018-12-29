import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionMantenimientoComponent } from './inscripcion-mantenimiento.component';

describe('InscripcionMantenimientoComponent', () => {
  let component: InscripcionMantenimientoComponent;
  let fixture: ComponentFixture<InscripcionMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
