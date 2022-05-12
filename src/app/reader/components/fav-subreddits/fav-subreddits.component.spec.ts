import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavSubredditsComponent } from './fav-subreddits.component';

describe('FavSubredditsComponent', () => {
  let component: FavSubredditsComponent;
  let fixture: ComponentFixture<FavSubredditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavSubredditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavSubredditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
