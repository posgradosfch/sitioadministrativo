import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoCitasVistaComponent } from './manejo-citas-vista.component';

describe('ManejoCitasVistaComponent', () => {
  let component: ManejoCitasVistaComponent;
  let fixture: ComponentFixture<ManejoCitasVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejoCitasVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejoCitasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
