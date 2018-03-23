import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTackingComponent } from './add-tacking.component';

describe('AddTackingComponent', () => {
  let component: AddTackingComponent;
  let fixture: ComponentFixture<AddTackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
