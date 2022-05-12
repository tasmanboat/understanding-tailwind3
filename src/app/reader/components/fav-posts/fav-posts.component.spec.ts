import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPostsComponent } from './fav-posts.component';

describe('FavPostsComponent', () => {
  let component: FavPostsComponent;
  let fixture: ComponentFixture<FavPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
