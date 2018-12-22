import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasMantenimientoComponent } from './programas-mantenimiento.component';

describe('ProgramasMantenimientoComponent', () => {
  let component: ProgramasMantenimientoComponent;
  let fixture: ComponentFixture<ProgramasMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramasMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
