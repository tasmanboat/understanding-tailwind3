import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FavSubredditsComponent } from './fav-subreddits.component';

import { FavSubredditService } from '../../services/fav-subreddit.service';
import { FAV_SUBREDDITS } from 'src/app/core/services/mock-fav-subreddits';
import { FavSubreddit } from 'src/app/reader/interfaces/fav-subreddit';
import { Observable, of } from 'rxjs';

describe('FavSubredditsComponent', () => {
  let component: FavSubredditsComponent;
  let fixture: ComponentFixture<FavSubredditsComponent>;

  let favSubredditServiceStub: Partial<FavSubredditService>;

  beforeEach(() => {
    // stub dependencies for test purposes
    favSubredditServiceStub = {
      getRecords: function(): Observable<FavSubreddit[]> {
        return of(FAV_SUBREDDITS);
      }
    }

    TestBed.configureTestingModule({
      declarations: [FavSubredditsComponent],
      providers: [
        { provide: FavSubredditService, useValue: favSubredditServiceStub },
      ]
    });

    fixture = TestBed.createComponent(FavSubredditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

// #region Component DOM testing

  it('should contain "Homepage"', () => {
    const favSubredditsDe: DebugElement = fixture.debugElement;
    const h4: HTMLElement = favSubredditsDe.query(By.css('.wrapper > div > h4')).nativeElement;
    expect(h4.textContent).toContain('Homepage');
  });

  it('should contain "Favourite"', () => {
    const favSubredditsDe: DebugElement = fixture.debugElement;
    const h4: HTMLElement = favSubredditsDe.query(By.css('.wrapper > div > h4:nth-child(3)')).nativeElement;
    expect(h4.textContent).toContain('Favourite');
  });

// #endregion

});

// CLI-generated tests
xdescribe('FavSubredditsComponent (CLI-generated tests)', () => {
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
