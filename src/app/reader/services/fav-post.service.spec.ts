import { TestBed } from '@angular/core/testing';

import { FavPostService } from './fav-post.service';
import { FavPostApiService } from 'src/app/reader/services/fav-post-api.service';

import { FAV_POSTS } from 'src/app/core/services/mock-fav-posts';
import { FavPost } from 'src/app/reader/interfaces/fav-post';
import { Observable, of } from 'rxjs';

describe('FavPostService', () => {
  let service: FavPostService;
  let favPostApiServiceSpy: jasmine.SpyObj<FavPostApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FavPostApiService', ['getRecords', 'updateRecord', 'addRecord']);
    spy.getRecords.and.returnValue(of(FAV_POSTS));

    TestBed.configureTestingModule({
      providers: [
        FavPostService,
        { provide: FavPostApiService, useValue: spy }
      ]
    });
    service = TestBed.inject(FavPostService);
    favPostApiServiceSpy = TestBed.inject(FavPostApiService) as jasmine.SpyObj<FavPostApiService>;
  });

  it('should be created', () => {
    expect(service).toBeDefined();
    expect(favPostApiServiceSpy.getRecords).toHaveBeenCalledTimes(1);
  });

  it('#getRecords should return an array of FavPost', (done: DoneFn) => {
    service.getRecords().subscribe((value: FavPost[]) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(0);
      expect(value?.[0]?.created_at).toBeInstanceOf(Number);
      done();
    });
    expect(favPostApiServiceSpy.getRecords).toHaveBeenCalledTimes(1);
  });

  it('#updateRecord', (done: DoneFn) => {
    const record: FavPost = { id: 1, permalink: '/r/AIS/comments/u2pjzm/what_is_the_apparently_excluded_zone_northwest_of/', title: `What is the apparently excluded zone northwest of Hawaii?`, subreddit: 'AIS', created_at: 1652797522, updated_at: -1 };
    favPostApiServiceSpy.updateRecord.and.returnValue(of(null)); // also work if spy.updateRecord is not set in beforeEach() setup
    service.updateRecord(record).subscribe(value => {
      expect(value).toBe(null);
      done();
    });
    expect(favPostApiServiceSpy.updateRecord).toHaveBeenCalledTimes(1);
    expect(favPostApiServiceSpy.getRecords).toHaveBeenCalledTimes(2);
  });

  it('#addRecord', (done: DoneFn) => {
    const record: FavPost = { id: -1, permalink: '/r/AIS/comments/u2pjzm/what_is_the_apparently_excluded_zone_northwest_of/', title: `What is the apparently excluded zone northwest of Hawaii?`, subreddit: 'AIS', created_at: Date.now(), updated_at: -1 };
    favPostApiServiceSpy.addRecord.and.returnValue(of(record));
    service.addRecord(record).subscribe(value => {
      expect(value).toBe(record);
      done();
    });
    expect(favPostApiServiceSpy.addRecord).toHaveBeenCalledTimes(1);
    expect(favPostApiServiceSpy.getRecords).toHaveBeenCalledTimes(2);
  });
});

xdescribe('FavPostService', () => {
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
