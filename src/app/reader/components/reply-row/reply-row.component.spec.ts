import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyRowComponent } from './reply-row.component';

describe('ReplyRowComponent', () => {
  let component: ReplyRowComponent;
  let fixture: ComponentFixture<ReplyRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
