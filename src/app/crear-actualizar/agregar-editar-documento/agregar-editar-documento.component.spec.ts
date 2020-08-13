import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarDocumentoComponent } from './agregar-editar-documento.component';

describe('AgregarEditarDocumentoComponent', () => {
  let component: AgregarEditarDocumentoComponent;
  let fixture: ComponentFixture<AgregarEditarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
