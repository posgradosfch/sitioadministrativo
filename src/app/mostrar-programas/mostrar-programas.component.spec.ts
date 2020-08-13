import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProgramasComponent } from './mostrar-programas.component';

describe('MostrarProgramasComponent', () => {
  let component: MostrarProgramasComponent;
  let fixture: ComponentFixture<MostrarProgramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarProgramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
