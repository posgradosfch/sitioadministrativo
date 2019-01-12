import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDescuentoComponent } from './agregar-descuento.component';

describe('AgregarDescuentoComponent', () => {
  let component: AgregarDescuentoComponent;
  let fixture: ComponentFixture<AgregarDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
