import { TestBed } from '@angular/core/testing';

import { FavPostsResolver } from './fav-posts.resolver';

describe('FavPostsResolver', () => {
  let resolver: FavPostsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FavPostsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
