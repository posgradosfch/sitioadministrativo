import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventoInscripcionComponent } from './crear-evento-inscripcion.component';

describe('CrearEventoInscripcionComponent', () => {
  let component: CrearEventoInscripcionComponent;
  let fixture: ComponentFixture<CrearEventoInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEventoInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEventoInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
