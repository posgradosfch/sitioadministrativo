import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentosMantenimientoComponent } from './descuentos-mantenimiento.component';

describe('DescuentosMantenimientoComponent', () => {
  let component: DescuentosMantenimientoComponent;
  let fixture: ComponentFixture<DescuentosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
