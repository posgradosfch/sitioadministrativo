import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramarCitaComponent } from './reprogramar-cita.component';

describe('ReprogramarCitaComponent', () => {
  let component: ReprogramarCitaComponent;
  let fixture: ComponentFixture<ReprogramarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprogramarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprogramarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
