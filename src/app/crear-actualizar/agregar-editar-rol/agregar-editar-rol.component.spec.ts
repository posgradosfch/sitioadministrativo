import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarRolComponent } from './agregar-editar-rol.component';

describe('AgregarEditarRolComponent', () => {
  let component: AgregarEditarRolComponent;
  let fixture: ComponentFixture<AgregarEditarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
