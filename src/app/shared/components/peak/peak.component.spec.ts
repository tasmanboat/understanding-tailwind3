import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakComponent } from './peak.component';

describe('PeakComponent', () => {
  let component: PeakComponent;
  let fixture: ComponentFixture<PeakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
