import { Component, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, first, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/reader/interfaces/post';

// whether a subreddit is a fav subreddit
import { FavPost } from 'src/app/reader/interfaces/fav-post';
import { FavPostService } from '../../services/fav-post.service';

@Component({
  selector: 'app-fav-post-button',
  templateUrl: './fav-post-button.component.html',
  styleUrls: ['./fav-post-button.component.scss']
})
export class FavPostButtonComponent implements OnInit {
// #region check whether a post is a fav post
  @Input()
  set post(post: Post) { this._post = post; this.postPermalink$.next(this._post.permalink) }
  get post(): Post { return this._post }
  _post: Post = { title: '(post not found)', replies: [], subreddit: '', id: '', permalink: '' } as Post;
// #endregion

  constructor(private favPostService: FavPostService) { }

  ngOnInit(): void {
  }

// #region check whether a post is a fav post
// this.post.permalink isFav(boolean), favPostId(number)
  private postPermalink$: BehaviorSubject<string> = new BehaviorSubject('');
  isFavPost$: Observable<boolean> = this.postPermalink$.pipe(
    switchMap((permalink: string) => {
      return this.favPostService.getIsFav(permalink).pipe(tap(_=>this.lock=false)) // locking
    })
  )
  favPostId$: Observable<number> = this.postPermalink$.pipe(
    switchMap((permalink: string) => {
      return this.favPostService.getFavPostId(permalink)
    })
  )
// #endregion

// #region add to fav post
  toggleFavPost() {
    if (this.post && this.post.title !== '(post not found)') { // a valid post
      this.lock = true; // locking
      this.favPostId$.pipe(first()).subscribe((favPostId: number) => {
        if (favPostId > -1) {
          this.favPostService.deleteRecord(favPostId).subscribe();
        }
        if (favPostId === -1) {
          const newFavPost: FavPost = {
            title: this.post?.title,
            permalink: this.post?.permalink,
            subreddit: this.post?.subreddit,
          } as FavPost;
          this.favPostService.addRecord(newFavPost).subscribe();
        }
      });
    }
  }
  lock: boolean = false;
// #endregion

}
