import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSettingsComponent } from './nav-settings.component';

describe('NavSettingsComponent', () => {
  let component: NavSettingsComponent;
  let fixture: ComponentFixture<NavSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
