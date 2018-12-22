import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasMantenimientoComponent } from './aulas-mantenimiento.component';

describe('AulasMantenimientoComponent', () => {
  let component: AulasMantenimientoComponent;
  let fixture: ComponentFixture<AulasMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulasMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulasMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
