import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { Subreddit } from 'src/app/reader/interfaces/subreddit';
import { Post } from 'src/app/reader/interfaces/post';
import { Reply } from 'src/app/reader/interfaces/reply';

import { PostApiService } from 'src/app/reader/services/post-api.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postApiService: PostApiService,
  ) { }

// #region post: load a post with content
// getPost(subredditName, postId)
  ngOnInit(): void {
    this.getPost(this.router.url);
    this.page = Number(this.route.snapshot.queryParamMap.get('rpn') ?? '1');
    // effect1: to read the query param on any page
    // effect2: to add the query param to the first page
    /*
    // not work, cannot get this.route.params this way ... for solution, see below
    this.sub2 = this.route.params.subscribe(params => {
      console.log('params ', params);
    })
    this.sub = this.route.paramMap.subscribe(params => {
      const pdSubreddit = params.get('subreddit') ?? 'Fijian';
      const pdPostId = params.get('postId') ?? 'pccxte';
      console.log(pdSubreddit);
      console.log(pdPostId);
      console.log(this.route.snapshot.paramMap.get('postId'));
      if (pdSubreddit && pdPostId) {
        // load a post
        this.postApiService.getPost(pdSubreddit, pdPostId).subscribe((post: Post) => {
          this.post = post;
        })
      }
    })
    */
  }
  getPost(url: string) {
    // console.log('(PostDetailsComponent) ' + url);
    let params: string[] = url.split('/');
    let subredditName: string = params[2];
    let postId: string = params[4];
    if (subredditName && postId) {
      // load a post
      this.postApiService.getPost(subredditName, postId).subscribe((post: Post) => {
        this.post = post;
      })
    }
  }
  post?: Post

  /*
  this.route.paramMap subscribe
  */
  sub: Subscription = this.router.events.pipe(
    filter((event: any): event is NavigationEnd => event instanceof NavigationEnd),
    // tap(_ => console.log(_)),
  ).subscribe((event: NavigationEnd) => {
    console.log('event.url: ' + event.url); // this.route.paramMap could be parsed from event.url
    this.getPost(event.url);
    if (event.url.includes('/comments/')) { this.page = 1 }
  });

// #endregion

// #region replies: pagination
/*
write page number into route param
*/
  // page: number = 1;
  set page(page: number) {
    this._page = page;
    // this.router.navigate(["."], { relativeTo: this.route, queryParams: { rpn: this.page }});
    // console.log(this.router.url);

    // for a post page, get current url without params, then add the current page param
    if (this.router.url.includes('/comments/')) {
      let url = this.router.url.includes('?') ? this.router.url.split('?')[0] : this.router.url;
      this.location.replaceState(`${url}?rpn=${this.page}`);
      console.log(`(PostDetailsComponent) (set page)` + url);
    }
  }
  get page(): number { return this._page }
  private _page: number = 1;

// #endregion

// #region post: render a post
  isPic(url: string): boolean {
    return url.endsWith('jpg') || url.endsWith('png') || url.endsWith('gif');
  }
  shouldShowUrl(post: Post): boolean {
    return post.url !== 'https://www.reddit.com'+post.permalink;
  }
// #endregion

// #region replies: trackById
  trackById(index: number, reply: Reply): string {
    return reply.id;
  }
// #endregion

// #region post: this.route.paramMap unsubscribe
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  // sub?: Subscription;
// #endregion

// #region eh: go back event handler
  goBack() {
    this.location.back();
  }
// #endregion

}
