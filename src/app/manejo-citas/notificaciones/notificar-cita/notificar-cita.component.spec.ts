import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificarCitaComponent } from './notificar-cita.component';

describe('NotificarCitaComponent', () => {
  let component: NotificarCitaComponent;
  let fixture: ComponentFixture<NotificarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
