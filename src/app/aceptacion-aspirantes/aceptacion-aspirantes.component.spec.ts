import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptacionAspirantesComponent } from './aceptacion-aspirantes.component';

describe('AceptacionAspirantesComponent', () => {
  let component: AceptacionAspirantesComponent;
  let fixture: ComponentFixture<AceptacionAspirantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptacionAspirantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptacionAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
