import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaperturarInscripcionComponent } from './reaperturar-inscripcion.component';

describe('ReaperturarInscripcionComponent', () => {
  let component: ReaperturarInscripcionComponent;
  let fixture: ComponentFixture<ReaperturarInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaperturarInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaperturarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
