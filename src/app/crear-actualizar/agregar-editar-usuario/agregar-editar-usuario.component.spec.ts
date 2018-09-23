import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarUsuarioComponent } from './agregar-editar-usuario.component';

describe('AgregarEditarUsuarioComponent', () => {
  let component: AgregarEditarUsuarioComponent;
  let fixture: ComponentFixture<AgregarEditarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
