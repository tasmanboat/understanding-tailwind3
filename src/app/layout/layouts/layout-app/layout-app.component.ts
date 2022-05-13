import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout-app',
  templateUrl: './layout-app.component.html',
  styleUrls: ['./layout-app.component.scss']
})
export class LayoutAppComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

// #region hide 'content' named outlet for 'fav/reddits' path
  showContent: boolean = true;
  ngOnInit(): void {
    this.showContent = this.router.url.endsWith('fav/subreddits') ? false : true;
    this.sub = this.router.events.pipe(
      filter((event: any): event is NavigationEnd => event instanceof NavigationEnd),
      // tap(_ => console.log(_)),
    ).subscribe((event: NavigationEnd) => {
      console.log(`(LayoutAppComponent) ` + event.url);
      this.showContent = event.url.endsWith('fav/subreddits') ? false : true;
    })
  }
// #endregion

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  sub?: Subscription;

}
