import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosMantenimientoComponent } from './permisos-mantenimiento.component';

describe('PermisosMantenimientoComponent', () => {
  let component: PermisosMantenimientoComponent;
  let fixture: ComponentFixture<PermisosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
