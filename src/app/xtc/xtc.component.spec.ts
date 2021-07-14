import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XtcComponent } from './xtc.component';

describe('XtcComponent', () => {
  let component: XtcComponent;
  let fixture: ComponentFixture<XtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
