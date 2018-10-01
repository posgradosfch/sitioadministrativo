import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramarCitasComponent } from './reprogramar-citas.component';

describe('ReprogramarCitasComponent', () => {
  let component: ReprogramarCitasComponent;
  let fixture: ComponentFixture<ReprogramarCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprogramarCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprogramarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
