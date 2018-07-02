import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCodigoComponent } from './generar-codigo.component';

describe('GenerarCodigoComponent', () => {
  let component: GenerarCodigoComponent;
  let fixture: ComponentFixture<GenerarCodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarCodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
