import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { tap, filter, switchMap } from 'rxjs/operators';

import { Subreddit } from 'src/app/reader/interfaces/subreddit';
import { Post } from 'src/app/reader/interfaces/post';
import { Reply } from 'src/app/reader/interfaces/reply';

import { PostApiService } from 'src/app/reader/services/post-api.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

/*
timeline
read this.router.url -> load post -> post loaded -> update url (the correct url + replies page number)
read this.router.url -> load post and replies on some page -> post and replies loaded -> update url (the correct url + replies page number)

read this.router.url -> load post and all replies -> post and replies loaded -> arrange replies / (page setter) update url

*/

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
// loadPost(subredditName, postId)
// when? this.route.paramMap subscribe /comments/
  ngOnInit(): void {
    this.loadPost(this.router.url).subscribe((post: Post) => {
      this.post = post;
      this.page = Number(this.route.snapshot.queryParamMap.get('rpn') ?? '1');
    })
    // effect effects
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

  private loadPost(url: string): Observable<Post> {
    console.log('(PostDetailsComponent) loadPost from ' + url);
    let params: string[] = url.split('/');
    let subredditName: string = params[2];
    let postId: string = params[4];
    if (params[3] === 'comments' && subredditName && postId) {
      return this.postApiService.getPost(subredditName, postId).pipe(
        tap((post: Post) => {
          console.log(`(PostDetailsComponent) loadPost done`);
        })
      )
    }
    return of({ title: '(post not found)' } as Post)
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
    if (event.url.includes('/comments/')) {
      this.loadPost(event.url).subscribe((post: Post) => {
        // for a post page, according to post.permalink, get current url without params, then add the current page param
        this.post = post;
        this.page = Number(this.route.snapshot.queryParamMap.get('rpn') ?? '1');
      })
    }
  });

// #endregion

// #region replies: pagination and url modification
/*
write post.permalink and page number into route param
*/
  // page: number = 1;
  set page(page: number) {
    this._page = page;
    // this.router.navigate(["."], { relativeTo: this.route, queryParams: { rpn: this.page }});
    // console.log(this.router.url);
    if (this?.post?.permalink) { this.location.replaceState(`${this.post.permalink}?rpn=${this._page}`); }
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
