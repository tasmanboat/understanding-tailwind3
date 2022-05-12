import { TestBed } from '@angular/core/testing';

import { SubredditApiService } from './subreddit-api.service';

describe('SubredditApiService', () => {
  let service: SubredditApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubredditApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
