import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasMantenimientoComponent } from './noticias-mantenimiento.component';

describe('NoticiasMantenimientoComponent', () => {
  let component: NoticiasMantenimientoComponent;
  let fixture: ComponentFixture<NoticiasMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiasMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
