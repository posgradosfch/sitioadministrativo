import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPasoComponent } from './agregar-editar-paso.component';

describe('AgregarEditarPasoComponent', () => {
  let component: AgregarEditarPasoComponent;
  let fixture: ComponentFixture<AgregarEditarPasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarPasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarPasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
