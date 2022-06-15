import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersistentStorageImportDirective } from './persistent-storage-import.directive';

@Component({
  template: `
  <a appPersistentStorageImport key="fav-subreddits" href="#">import fav subreddits</a>
  <a appPersistentStorageImport key="fav-posts" href="#">import fav posts</a>
  <a href="#">a link</a>`
})
class TestComponent { }

describe('PersistentStorageImportDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the two elements w/ the directive
  let bareA: DebugElement; // the <a> w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ PersistentStorageImportDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached PersistentStorageImportDirective
    des = fixture.debugElement.queryAll(By.directive(PersistentStorageImportDirective));

    // the a without the PersistentStorageImportDirective
    bareA = fixture.debugElement.query(By.css('a:not([appPersistentStorageImport])'));
  });

  // tests
  it('should have two import elements', () => {
    expect(des.length).toBe(2);
  });

  // injected directive
  // attached PersistentStorageImportDirective can be injected
  it('can inject `PersistentStorageImportDirective` in 1st <a>', () => {
    const dir = des[0].injector.get(PersistentStorageImportDirective);
    expect(dir).toBeTruthy();
  });

  it('cannot inject `PersistentStorageImportDirective` in 3rd <a>', () => {
    const dir = bareA.injector.get(PersistentStorageImportDirective, null);
    expect(dir).toBe(null);
  });

  // DebugElement.providerTokens
  // attached PersistentStorageImportDirective should be listed in the providerTokens
  it('should have `PersistentStorageImportDirective` in 1st <a> providerTokens', () => {
    expect(des[0].providerTokens).toContain(PersistentStorageImportDirective);
  });

  it('should not have `PersistentStorageImportDirective` in 3rd <a> providerTokens', () => {
    expect(bareA.providerTokens).not.toContain(PersistentStorageImportDirective);
  });

});

/*
describe('PersistentStorageImportDirective', () => {
  it('should create an instance', () => {
    const directive = new PersistentStorageImportDirective();
    expect(directive).toBeTruthy();
  });
});
*/
