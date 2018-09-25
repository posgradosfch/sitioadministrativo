import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosMantenimientoComponent } from './pasos-mantenimiento.component';

describe('PasosMantenimientoComponent', () => {
  let component: PasosMantenimientoComponent;
  let fixture: ComponentFixture<PasosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
