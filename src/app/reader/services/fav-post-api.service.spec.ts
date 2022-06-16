import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { FavPostApiService } from './fav-post-api.service';
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

import { FavPost } from 'src/app/reader/interfaces/fav-post';
import { FAV_POSTS } from 'src/app/core/services/mock-fav-posts';

// HttpClient testing
describe('FavPostApiService', () => {
  let favPostApiService: FavPostApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let pssStub: Partial<PersistentStorageService>;

  beforeEach(() => {
    // stub dependencies for test purposes
    pssStub = {
      setItemAsync: function() {
        return new Promise(resolve => { resolve(undefined) });
      }
    }

    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [
        FavPostApiService,
        { provide: PersistentStorageService, useValue: pssStub }
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    favPostApiService = TestBed.inject(FavPostApiService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// service method tests begin ///

  it('should be created', () => {
    expect(favPostApiService).toBeDefined();
  });

  it('#getRecords extra test: should return an array of FavPost', () => {
    favPostApiService.getRecords().subscribe((value: FavPost[]) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.created_at).toBeInstanceOf(Number);
    });

    const req = httpTestingController.expectOne({ method: 'GET', url: 'api/fav-posts' });
    req.flush(FAV_POSTS);
    // httpTestingController.verify();
  });

  describe('#getRecords', () => {
    let expectedFavPosts: FavPost[];

    beforeEach(() => {
      favPostApiService = TestBed.inject(FavPostApiService);
      expectedFavPosts = FAV_POSTS;
    });

    it('should return expected fav posts (called once)', () => {

      favPostApiService.getRecords().subscribe({
        next: value => expect(value).withContext('should return expected fav posts').toEqual(expectedFavPosts),
        error: fail,
      });

      // also work
      // favPostApiService.getRecords().subscribe(value => {
      //   expect(value).withContext('should return expected fav posts').toEqual(expectedFavPosts);
      // });

      // service should have made one request to GET value from expected URL
      const req = httpTestingController.expectOne({ method: 'GET', url: 'api/fav-posts' });
      expect(req.request.method).toEqual('GET');

      // Respond with the mock fav posts
      req.flush(expectedFavPosts);
    });

    it('should be OK returning no fav posts', () => {

      favPostApiService.getRecords().subscribe({
        next: value => expect(value.length).withContext('should have empty array').toEqual(0),
        error: fail,
      });

      // also work
      // favPostApiService.getRecords().subscribe(value => {
      //   expect(value.length).withContext('should have empty array').toEqual(0);
      // });

      const req = httpTestingController.expectOne({ method: 'GET', url: 'api/fav-posts' });
      req.flush([]); // Respond with no fav posts
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty fav posts result', () => {

      favPostApiService.getRecords().subscribe({
        next: value => expect(value.length).withContext('should return empty array').toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne({ method: 'GET', url: 'api/fav-posts' });

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected fav posts (called multiple times)', () => {

      favPostApiService.getRecords().subscribe();
      favPostApiService.getRecords().subscribe();
      favPostApiService.getRecords().subscribe({
        next: value => expect(value).withContext('should return expected fav posts').toEqual(expectedFavPosts),
        error: fail,
      });

      const requests = httpTestingController.match('api/fav-posts');
      expect(requests.length).withContext('calls to getRecords()').toEqual(3);

      // Respond to each request with different mock fav post results
      requests[0].flush([]);
      requests[1].flush([{ id: 1, permalink: '/r/AIS/comments/u2pjzm/what_is_the_apparently_excluded_zone_northwest_of/', title: `What is the apparently excluded zone northwest of Hawaii?`, subreddit: 'AIS', created_at: 1652797522, updated_at: -1 }]);
      requests[2].flush(expectedFavPosts);
    });

  });

});

// CLI-generated tests
xdescribe('FavPostApiService (CLI-generated tests)', () => {
  let service: FavPostApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavPostApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
