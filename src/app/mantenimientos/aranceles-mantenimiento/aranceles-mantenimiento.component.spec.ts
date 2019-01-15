import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArancelesMantenimientoComponent } from './aranceles-mantenimiento.component';

describe('ArancelesMantenimientoComponent', () => {
  let component: ArancelesMantenimientoComponent;
  let fixture: ComponentFixture<ArancelesMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArancelesMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArancelesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
