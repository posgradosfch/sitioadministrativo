import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProgramaComponent } from './agregar-programa.component';

describe('AgregarProgramaComponent', () => {
  let component: AgregarProgramaComponent;
  let fixture: ComponentFixture<AgregarProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
