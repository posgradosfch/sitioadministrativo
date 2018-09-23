import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesMantenimientoComponent } from './docentes-mantenimiento.component';

describe('DocentesMantenimientoComponent', () => {
  let component: DocentesMantenimientoComponent;
  let fixture: ComponentFixture<DocentesMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocentesMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
