import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaDecisionComponent } from './toma-decision.component';

describe('TomaDecisionComponent', () => {
  let component: TomaDecisionComponent;
  let fixture: ComponentFixture<TomaDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
