import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArancelComponent } from './agregar-arancel.component';

describe('AgregarArancelComponent', () => {
  let component: AgregarArancelComponent;
  let fixture: ComponentFixture<AgregarArancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
