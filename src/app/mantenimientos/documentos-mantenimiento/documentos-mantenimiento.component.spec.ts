import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosMantenimientoComponent } from './documentos-mantenimiento.component';

describe('DocumentosMantenimientoComponent', () => {
  let component: DocumentosMantenimientoComponent;
  let fixture: ComponentFixture<DocumentosMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
