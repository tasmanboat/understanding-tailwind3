import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersistentStorageExportDirective } from './persistent-storage-export.directive';

@Component({
  template: `
  <a appPersistentStorageExport key="fav-subreddits" href="#">export fav subreddits</a>
  <a appPersistentStorageExport key="fav-posts" href="#">export fav posts</a>
  <a href="#">a link</a>`
})
class TestComponent { }

describe('PersistentStorageExportDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the two elements w/ the directive
  let bareA: DebugElement; // the <a> w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ PersistentStorageExportDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached PersistentStorageExportDirective
    des = fixture.debugElement.queryAll(By.directive(PersistentStorageExportDirective));

    // the a without the PersistentStorageExportDirective
    bareA = fixture.debugElement.query(By.css('a:not([appPersistentStorageExport])'));
  });

  // tests
  it('should have two export elements', () => {
    expect(des.length).toBe(2);
  });

  // injected directive
  // attached PersistentStorageExportDirective can be injected
  it('can inject `PersistentStorageExportDirective` in 1st <a>', () => {
    const dir = des[0].injector.get(PersistentStorageExportDirective);
    expect(dir).toBeTruthy();
  });

  it('cannot inject `PersistentStorageExportDirective` in 3rd <a>', () => {
    const dir = bareA.injector.get(PersistentStorageExportDirective, null);
    expect(dir).toBe(null);
  });

  // DebugElement.providerTokens
  // attached PersistentStorageExportDirective should be listed in the providerTokens
  it('should have `PersistentStorageExportDirective` in 1st <a> providerTokens', () => {
    expect(des[0].providerTokens).toContain(PersistentStorageExportDirective);
  });

  it('should not have `PersistentStorageExportDirective` in 3rd <a> providerTokens', () => {
    expect(bareA.providerTokens).not.toContain(PersistentStorageExportDirective);
  });

});

/*
describe('PersistentStorageExportDirective', () => {
  it('should create an instance', () => {
    const directive = new PersistentStorageExportDirective();
    expect(directive).toBeTruthy();
  });
});
*/
