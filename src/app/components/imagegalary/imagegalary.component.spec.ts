import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagegalaryComponent } from './imagegalary.component';

describe('ImagegalaryComponent', () => {
  let component: ImagegalaryComponent;
  let fixture: ComponentFixture<ImagegalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagegalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagegalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
