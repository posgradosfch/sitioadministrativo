import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosMantenimientoComponent } from './horarios-mantenimiento.component';

describe('HorariosMantenimientoComponent', () => {
  let component: HorariosMantenimientoComponent;
  let fixture: ComponentFixture<HorariosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
