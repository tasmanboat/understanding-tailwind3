import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';

// whether a subreddit is a fav subreddit
import { FavSubreddit } from 'src/app/reader/interfaces/fav-subreddit';
import { FavSubredditService } from '../../services/fav-subreddit.service';

// subreddit's correct name and content
// if not found, it will get a { name: '(subreddit not found)', posts: [] } as Subreddit
import { Subreddit } from 'src/app/reader/interfaces/subreddit';
import { SubredditApiService } from '../../services/subreddit-api.service';

import { Post } from 'src/app/reader/interfaces/post';

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
    private subredditApiService: SubredditApiService,
  ) { }

// #region load a subreddit on search

  onSearch(redditName: string) {
    if (redditName !== this.cacheRoute.subreddit) {
      this.loadSubreddit(redditName)
    }
  }

  private loadSubreddit(redditName: string) {
    this.subredditApiService.getSubreddit(redditName).subscribe((subreddit: Subreddit) => {
      this.subreddit = subreddit;
      this.subredditName$.next(this.subreddit.name);
      this.cacheRoute = {...this.cacheRoute, subreddit: this.subreddit.name }; // update cacheRoute
      if (!this.router.url.includes('/comments/')) {
        // this.location.replaceState(`/r/${this.subreddit.name}`);
        this.router.navigate(['r', this.subreddit.name]);
      }
    })
  }

// #endregion

// #region load a subreddit with correct name and content
// this.subreddit (subredditApiService.getSubreddit)
// read route params, call (subredditApiService.getSubreddit) and find the correct subreddit name + content
// get subreddit name; get subreddit content (subreddit name and latest posts)
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const pdSubreddit = params.get('subreddit') ?? HOME_SUBREDDIT;
      // this.subreddit = this.subredditApiService.getSubreddit(pdSubreddit).subscribe(_ => this.subreddit = _; this.subredditName$.next(this.subreddit.name); 额外路由修饰; )
      if (pdSubreddit) { // where magic happens
        this.loadSubreddit(pdSubreddit)
      }
    });
  }
  subreddit?: Subreddit;
  cacheRoute = { subreddit: '' };
// #endregion

// #region check whether a subreddit is a fav subreddit
// this.subreddit.name isFav(boolean), favSubredditId(number)
  private subredditName$: BehaviorSubject<string> = new BehaviorSubject('');
  isFavSubreddit$: Observable<boolean> = this.subredditName$.pipe(
    switchMap((subreddit: string) => {
      return this.favSubredditService.getIsFav(subreddit).pipe(tap(_=>this.lock=false)) // locking
    })
  )
  favSubredditId$: Observable<number> = this.subredditName$.pipe(
    switchMap((subreddit: string) => {
      return this.favSubredditService.getFavSubredditId(subreddit)
    })
  )
// #endregion

// #region add to fav subreddit
  toggleFavSubreddit() {
    if (this.subreddit && this.subreddit.name !== '(subreddit not found)') { // a valid subreddit
      this.lock = true; // locking
      this.favSubredditId$.pipe(first()).subscribe((favSubredditId: number) => {
        if (favSubredditId > -1) {
          this.favSubredditService.deleteRecord(favSubredditId).subscribe();
        }
        if (favSubredditId === -1) {
          const newFavSubreddit: FavSubreddit = { name: this.subreddit?.name } as FavSubreddit;
          this.favSubredditService.addRecord(newFavSubreddit).subscribe();
        }
      });
    }
  }
  lock: boolean = false;
// #endregion

// #region trackById
  trackById(index: number, post: Post): string {
    return post.id;
  }
// #endregion

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  sub?: Subscription;

}

const HOME_SUBREDDIT = 'COD';
