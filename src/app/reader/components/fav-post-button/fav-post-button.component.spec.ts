import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPostButtonComponent } from './fav-post-button.component';

describe('FavPostButtonComponent', () => {
  let component: FavPostButtonComponent;
  let fixture: ComponentFixture<FavPostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavPostButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavPostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
