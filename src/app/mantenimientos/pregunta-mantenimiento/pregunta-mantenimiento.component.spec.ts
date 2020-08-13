import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaMantenimientoComponent } from './pregunta-mantenimiento.component';

describe('PreguntaMantenimientoComponent', () => {
  let component: PreguntaMantenimientoComponent;
  let fixture: ComponentFixture<PreguntaMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
