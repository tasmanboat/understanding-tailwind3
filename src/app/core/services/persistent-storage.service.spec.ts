import { TestBed } from '@angular/core/testing';

import { PersistentStorageService } from './persistent-storage.service';
import { LocalStorageRefService } from './local-storage-ref.service';

describe('PersistentStorageService without Angular testing support', () => {
  let service: PersistentStorageService;

  it('should be created', () => {
    service = new PersistentStorageService(new LocalStorageRefService());
    expect(service).toBeDefined();
  });

  it('#getItemAsync should return real value from the real service', () => {
    service = new PersistentStorageService(new LocalStorageRefService());
    expect(service.getItemAsync('fav-subreddits')).toBeInstanceOf(Promise);
  });
});

describe('PersistentStorageService without Angular testing support, with spy', () => {
  let service: PersistentStorageService;

  it('should be created', () => {
    service = new PersistentStorageService(new LocalStorageRefService());
    expect(service).toBeDefined();
  });

  it('#getItemAsync should use stubbed value from a spy', () => {
    const _singletonLocalStorage: Storage = localStorage;
    const localStorageRefServiceSpy = jasmine.createSpyObj('LocalStorageRefService', {}, { localStorage: _singletonLocalStorage });

    expect(localStorageRefServiceSpy.localStorage).toBeInstanceOf(Storage);
    expect(localStorageRefServiceSpy.localStorage).toEqual(localStorage);

    service = new PersistentStorageService(localStorageRefServiceSpy);
    expect(service.getItemAsync('fav-subreddits')).toBeInstanceOf(Promise);
  });
});

describe('PersistentStorageService', () => {
  let service: PersistentStorageService;
  let localStorageRefServiceSpy: jasmine.SpyObj<LocalStorageRefService>;

  beforeEach(() => {
    const _singletonLocalStorage: Storage = localStorage;
    const spy = jasmine.createSpyObj('LocalStorageRefService', {}, { localStorage: _singletonLocalStorage });

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        PersistentStorageService,
        { provide: LocalStorageRefService, useValue: spy }
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(PersistentStorageService);
    localStorageRefServiceSpy = TestBed.inject(LocalStorageRefService) as jasmine.SpyObj<LocalStorageRefService>;
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('localStorage property should use stubbed value from a spy', () => {
    const ls: Storage = localStorage;
    expect(localStorageRefServiceSpy.localStorage).toBeInstanceOf(Storage);
    expect(localStorageRefServiceSpy.localStorage).toEqual(ls);
  });

  it('#getItemAsync should use stubbed value from a spy', () => {
    const ls: Storage = localStorage;

    expect(localStorageRefServiceSpy.localStorage).toBeInstanceOf(Storage);
    expect(localStorageRefServiceSpy.localStorage).toEqual(ls);

    expect(service.getItemAsync('fav-subreddits'))
      .withContext('service used stub value')
      .toBeInstanceOf(Promise);
  });
});

// CLI-generated tests
xdescribe('PersistentStorageService (CLI-generated tests)', () => {
  let service: PersistentStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistentStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
