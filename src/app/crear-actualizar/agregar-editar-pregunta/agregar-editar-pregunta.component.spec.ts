import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPreguntaComponent } from './agregar-editar-pregunta.component';

describe('AgregarEditarPreguntaComponent', () => {
  let component: AgregarEditarPreguntaComponent;
  let fixture: ComponentFixture<AgregarEditarPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
