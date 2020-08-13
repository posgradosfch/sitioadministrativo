import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInscripcionComponent } from './menu-inscripcion.component';

describe('MenuInscripcionComponent', () => {
  let component: MenuInscripcionComponent;
  let fixture: ComponentFixture<MenuInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
