import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoCitasComponent } from './manejo-citas.component';

describe('ManejoCitasComponent', () => {
  let component: ManejoCitasComponent;
  let fixture: ComponentFixture<ManejoCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejoCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejoCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
