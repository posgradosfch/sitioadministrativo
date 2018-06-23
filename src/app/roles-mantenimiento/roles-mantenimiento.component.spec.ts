import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMantenimientoComponent } from './roles-mantenimiento.component';

describe('RolesMantenimientoComponent', () => {
  let component: RolesMantenimientoComponent;
  let fixture: ComponentFixture<RolesMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
