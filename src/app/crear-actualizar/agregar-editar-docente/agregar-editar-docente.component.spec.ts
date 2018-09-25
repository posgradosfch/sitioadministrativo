import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarDocenteComponent } from './agregar-editar-docente.component';

describe('AgregarEditarDocenteComponent', () => {
  let component: AgregarEditarDocenteComponent;
  let fixture: ComponentFixture<AgregarEditarDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
