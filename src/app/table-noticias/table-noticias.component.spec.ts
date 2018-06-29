import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNoticiasComponent } from './table-noticias.component';

describe('TableNoticiasComponent', () => {
  let component: TableNoticiasComponent;
  let fixture: ComponentFixture<TableNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
