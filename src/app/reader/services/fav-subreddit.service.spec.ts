import { TestBed } from '@angular/core/testing';

import { FavSubredditService } from './fav-subreddit.service';

describe('FavSubredditService', () => {
  let service: FavSubredditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavSubredditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
