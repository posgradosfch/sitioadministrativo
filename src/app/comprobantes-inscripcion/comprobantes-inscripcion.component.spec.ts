import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesInscripcionComponent } from './comprobantes-inscripcion.component';

describe('ComprobantesInscripcionComponent', () => {
  let component: ComprobantesInscripcionComponent;
  let fixture: ComponentFixture<ComprobantesInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantesInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
