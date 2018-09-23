import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarNoticiaComponent } from './agregar-editar-noticia.component';

describe('AgregarEditarNoticiaComponent', () => {
  let component: AgregarEditarNoticiaComponent;
  let fixture: ComponentFixture<AgregarEditarNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
