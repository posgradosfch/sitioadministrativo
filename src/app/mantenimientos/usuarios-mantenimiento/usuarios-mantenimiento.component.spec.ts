import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMantenimientoComponent } from './usuarios-mantenimiento.component';

describe('UsuariosMantenimientoComponent', () => {
  let component: UsuariosMantenimientoComponent;
  let fixture: ComponentFixture<UsuariosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
