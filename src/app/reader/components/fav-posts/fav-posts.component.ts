import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, first, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FavPost } from '../../interfaces/fav-post';
import { FavPostService } from '../../services/fav-post.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fav-posts',
  templateUrl: './fav-posts.component.html',
  styleUrls: ['./fav-posts.component.scss']
})
export class FavPostsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private service: FavPostService,
  ) { }

  ngOnInit(): void {
  }

// #region search
  search(term: string) {
    this.searchTerms$.next(term);
  }
  private searchTerms$ = new BehaviorSubject<string>('');
// #endregion

// #region records
  favPosts$: Observable<FavPost[]> = this.searchTerms$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((term: string) => {
      return this.service.getRecords().pipe(
        map((records: FavPost[]) => {
          if (term?.trim()) {
            let arrTerm = term.match(/\w+/g)?.map(word => word.toLowerCase());
            return records.filter(record => {
              // for every record title, check if the title contains substring (every item in arrTerm acts the substring)
              let title = record.title.toLowerCase();
              let containsAll = arrTerm?.every(i => title.includes(i));
              // return containsAll;
              let subreddit = record.subreddit.toLowerCase();
              let matchesSubreddit = arrTerm?.some(i => subreddit.includes(i));
              return containsAll || matchesSubreddit;
            })
          } else {
            return records;
          }
        }),
        tap((records: FavPost[]) => {
          if (term?.trim()) {
            this.title = `search results (${records.length})`
          } else {
            this.title = `bookmarks (${records.length})`
          }
        })
      )
    })
  );
  title = 'loading ...';
// #endregion

// #region delete a record
  onDelete(e: any, favPost: FavPost) {
    e.preventDefault();
    e.stopPropagation();
    this.service.deleteRecord(favPost.id).subscribe();
  }
// #endregion

// #region trackById
  trackById(index: number, record: FavPost): number {
    return record.id;
  }
// #endregion

// #region load a fav post
  handleClick(post: FavPost) {
    this.location.replaceState(`${post.permalink}?rpn=1`)
  }
// #endregion

}
