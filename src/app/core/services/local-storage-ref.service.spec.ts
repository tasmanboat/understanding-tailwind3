import { TestBed } from '@angular/core/testing';

import { LocalStorageRefService } from './local-storage-ref.service';

describe('LocalStorageRefService without Angular testing support', () => {
  let service: LocalStorageRefService;

  it('should be created', () => {
    service = new LocalStorageRefService();
    expect(service).toBeDefined();
  });

  it('localStorage property should return localStorage', () => {
    service = new LocalStorageRefService();
    let ls: Storage = localStorage;
    expect(service.localStorage).toBe(ls);
  });

  it('localStorage property should return singleton localStorage', () => {
    service = new LocalStorageRefService();
    expect(service.localStorage).toBe(localStorage);
  });
});

describe('LocalStorageRefService', () => {
  let service: LocalStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageRefService]
    });
    service = TestBed.inject(LocalStorageRefService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('localStorage property should return localStorage', () => {
    let ls: Storage = localStorage;
    expect(service.localStorage).toBe(ls);
  });

  it('localStorage property should return singleton localStorage', () => {
    expect(service.localStorage).toBe(localStorage);
  });
});

// CLI-generated tests
xdescribe('LocalStorageRefService (CLI-generated tests)', () => {
  let service: LocalStorageRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
