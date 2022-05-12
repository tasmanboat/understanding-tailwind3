import { TestBed } from '@angular/core/testing';

import { FavSubredditApiService } from './fav-subreddit-api.service';

describe('FavSubredditApiService', () => {
  let service: FavSubredditApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavSubredditApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
