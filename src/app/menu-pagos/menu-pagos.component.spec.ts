import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPagosComponent } from './menu-pagos.component';

describe('MenuPagosComponent', () => {
  let component: MenuPagosComponent;
  let fixture: ComponentFixture<MenuPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
