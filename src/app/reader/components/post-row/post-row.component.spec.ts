import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRowComponent } from './post-row.component';

describe('PostRowComponent', () => {
  let component: PostRowComponent;
  let fixture: ComponentFixture<PostRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
