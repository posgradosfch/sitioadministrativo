import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDocumentoComponent } from './editar-documento.component';

describe('EditarDocumentoComponent', () => {
  let component: EditarDocumentoComponent;
  let fixture: ComponentFixture<EditarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
