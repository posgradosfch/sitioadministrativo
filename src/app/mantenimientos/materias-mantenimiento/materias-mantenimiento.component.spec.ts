import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasMantenimientoComponent } from './materias-mantenimiento.component';

describe('MateriasMantenimientoComponent', () => {
  let component: MateriasMantenimientoComponent;
  let fixture: ComponentFixture<MateriasMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
