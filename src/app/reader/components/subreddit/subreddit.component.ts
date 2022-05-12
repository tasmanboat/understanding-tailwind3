import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { FavSubredditService } from '../../services/fav-subreddit.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.scss']
})
export class SubredditComponent implements OnInit, OnDestroy {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private favSubredditService: FavSubredditService,
  ) { }

// #region get reddit name; get reddit content (reddit name and latest posts)
// read route param, find the correct reddit name
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const pdReddit = params.get('subreddit') ?? 'COD';
      // this.reddit = this.redditApiService.getReddit(pdReddit).subscribe(_ => this.reddit = _; this.redditName$.next(this.reddit.name); 额外路由修饰; )
      console.log(pdReddit); // correct reddit name
      this.subredditName$.next(pdReddit);
    });
  }
// #endregion

// #region isFav
  private subredditName$: BehaviorSubject<string> = new BehaviorSubject('');
  isFavSubreddit$: Observable<boolean> = this.subredditName$.pipe(
    switchMap((reddit: string) => {
      return this.favSubredditService.getIsFav(reddit)
    })
  )
// #endregion

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  sub?: Subscription;

}
