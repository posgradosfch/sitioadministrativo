import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarInscripcionComponent } from './generar-inscripcion.component';

describe('GenerarInscripcionComponent', () => {
  let component: GenerarInscripcionComponent;
  let fixture: ComponentFixture<GenerarInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
