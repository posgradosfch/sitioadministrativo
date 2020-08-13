import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAulaComponent } from './agregar-aula.component';

describe('AgregarAulaComponent', () => {
  let component: AgregarAulaComponent;
  let fixture: ComponentFixture<AgregarAulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
