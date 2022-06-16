import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

import { Observable, of } from 'rxjs';
import { FavSubreddit } from 'src/app/reader/interfaces/fav-subreddit';
import { FavSubredditService } from 'src/app/reader/services/fav-subreddit.service';
import { FAV_SUBREDDITS } from 'src/app/core/services/mock-fav-subreddits';

// for testing HeaderComponent (class only)
class MockFavSubredditService {
  getRecords(): Observable<FavSubreddit[]> {
    return of(FAV_SUBREDDITS);
  }
}

describe('HeaderComponent (class only)', () => {
  let component: HeaderComponent;
  let favSubredditService: FavSubredditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        HeaderComponent,
        { provide: FavSubredditService, useClass: MockFavSubredditService }
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.inject(HeaderComponent);
    favSubredditService = TestBed.inject(FavSubredditService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('#getRecords should return an array', (done: DoneFn) => {
    favSubredditService.getRecords().subscribe(value => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.isPinned).toBeInstanceOf(Boolean);
      done();
    });
  });

  it('should have favSubreddits$', (done: DoneFn) => {
    component.favSubreddits$.subscribe(value => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.isPinned).toBeInstanceOf(Boolean);
      done();
    })
  });
});

// for testing HeaderComponent
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let favSubredditServiceStub: Partial<FavSubredditService>;

  beforeEach(() => {
    // stub dependencies for test purposes
    favSubredditServiceStub = {
      getRecords: function(): Observable<FavSubreddit[]> {
        return of(FAV_SUBREDDITS);
      }
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: FavSubredditService, useValue: favSubredditServiceStub }
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('#getRecords should be a function, should return an array', (done: DoneFn) => {
    expect(favSubredditServiceStub.getRecords).toBeInstanceOf(Function);
    favSubredditServiceStub.getRecords?.().subscribe(value => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.isPinned).toBeInstanceOf(Boolean);
      done();
    });
  });

  it('should have favSubreddits$', (done: DoneFn) => {
    component.favSubreddits$.subscribe(value => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.isPinned).toBeInstanceOf(Boolean);
      done();
    })
  });

// #region Component DOM testing

  it('should contain "Reader"', () => {
    const headerDe: DebugElement = fixture.debugElement;
    // const h1: HTMLElement = headerDe.query(By.css('.header h1')).nativeElement;
    const h1: HTMLElement = headerDe.query(By.css('.header > div:nth-child(1) > h1')).nativeElement;
    expect(h1.textContent).toContain('Reader');
  });

// #endregion

});

// CLI-generated tests
xdescribe('HeaderComponent (CLI-generated tests)', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
