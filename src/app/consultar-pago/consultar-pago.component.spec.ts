import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPagoComponent } from './consultar-pago.component';

describe('ConsultarPagoComponent', () => {
  let component: ConsultarPagoComponent;
  let fixture: ComponentFixture<ConsultarPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
