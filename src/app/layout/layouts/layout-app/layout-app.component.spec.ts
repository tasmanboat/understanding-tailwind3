import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LayoutAppComponent } from './layout-app.component';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

describe('LayoutAppComponent', () => {
  let component: LayoutAppComponent;
  let fixture: ComponentFixture<LayoutAppComponent>;

  let activeRouteStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;
  let locationStub: Partial<Location>;

  beforeEach(() => {
    // stub dependencies for test purposes
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
      url: '',
      events: new Observable(),
    }
    activeRouteStub = {};
    locationStub = {};

    TestBed.configureTestingModule({
      declarations: [LayoutAppComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activeRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
      ]
    });

    fixture = TestBed.createComponent(LayoutAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

// #region Component DOM testing

  it('should contain "home"', () => {
    const layoutAppDe: DebugElement = fixture.debugElement;
    // const i1: HTMLElement = layoutAppDe.query(By.css('.main i')).nativeElement;
    const i1: HTMLElement = layoutAppDe.query(By.css('.main > div > a:nth-child(1) > i')).nativeElement;
    expect(i1.textContent).toContain('home');
  });

  it('should contain "collections_bookmark"', () => {
    const layoutAppDe: DebugElement = fixture.debugElement;
    const i2: HTMLElement = layoutAppDe.query(By.css('.main > div > a:nth-child(2) > i')).nativeElement;
    expect(i2.textContent).toContain('collections_bookmark');
  });

// #endregion

});

// CLI-generated tests
xdescribe('LayoutAppComponent (CLI-generated tests)', () => {
  let component: LayoutAppComponent;
  let fixture: ComponentFixture<LayoutAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
