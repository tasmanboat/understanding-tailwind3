import { TestBed } from '@angular/core/testing';

import { FavPostService } from './fav-post.service';
import { FavPostApiService } from 'src/app/reader/services/fav-post-api.service';

import { FAV_POSTS } from 'src/app/core/services/mock-fav-posts';
import { FavPost } from 'src/app/reader/interfaces/fav-post';
import { Observable, of } from 'rxjs';

describe('FavPostService', () => {
  let service: FavPostService;
  let favPostApiServiceStub: Partial<FavPostApiService>;

  beforeEach(() => {
    // stub dependencies for test purposes
    favPostApiServiceStub = {
      getRecords: function(): Observable<FavPost[]> {
        return of(FAV_POSTS);
      }
    }

    TestBed.configureTestingModule({
      providers: [
        FavPostService,
        { provide: FavPostApiService, useValue: favPostApiServiceStub }
      ]
    });
    service = TestBed.inject(FavPostService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('#getRecords should return an array of FavPost', (done: DoneFn) => {
    service.getRecords().subscribe((value: FavPost[]) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.created_at).toBeInstanceOf(Number);
      done();
    });
  });

});

// CLI-generated tests
xdescribe('FavPostService (CLI-generated tests)', () => {
  let service: FavPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
