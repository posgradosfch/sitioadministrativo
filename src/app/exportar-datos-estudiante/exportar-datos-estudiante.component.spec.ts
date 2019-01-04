import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarDatosEstudianteComponent } from './exportar-datos-estudiante.component';

describe('ExportarDatosEstudianteComponent', () => {
  let component: ExportarDatosEstudianteComponent;
  let fixture: ComponentFixture<ExportarDatosEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportarDatosEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportarDatosEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
