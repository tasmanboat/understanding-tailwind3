import { TestBed } from '@angular/core/testing';

import { FavPostService } from './fav-post.service';

describe('FavPostService', () => {
  let service: FavPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
