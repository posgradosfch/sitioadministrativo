import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarEvaluacionComponent } from './crear-editar-evaluacion.component';

describe('CrearEditarEvaluacionComponent', () => {
  let component: CrearEditarEvaluacionComponent;
  let fixture: ComponentFixture<CrearEditarEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
