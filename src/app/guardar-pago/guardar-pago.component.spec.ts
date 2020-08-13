import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarPagoComponent } from './guardar-pago.component';

describe('GuardarPagoComponent', () => {
  let component: GuardarPagoComponent;
  let fixture: ComponentFixture<GuardarPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
