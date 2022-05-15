import { TestBed } from '@angular/core/testing';

import { FavPostApiService } from './fav-post-api.service';

describe('FavPostApiService', () => {
  let service: FavPostApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavPostApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
