import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarPagoComponent } from './verificar-pago.component';

describe('VerificarPagoComponent', () => {
  let component: VerificarPagoComponent;
  let fixture: ComponentFixture<VerificarPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
