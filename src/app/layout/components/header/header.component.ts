import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FavSubreddit } from 'src/app/reader/interfaces/fav-subreddit';
import { FavSubredditService } from 'src/app/reader/services/fav-subreddit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private service: FavSubredditService) { }

  ngOnInit(): void {
  }

// #region records
// also set reader-home-subreddit, as the homepage subreddit
  favSubreddits$: Observable<FavSubreddit[]> = this.service.getRecords().pipe(
    map((favSubreddits: FavSubreddit[]) => favSubreddits.filter(r => r.isPinned)),
    tap((records: FavSubreddit[]) => {
      const hs = localStorage.getItem('reader-home-subreddit');
      if (!hs) {
        const id = Math.min(...records.map(record => record.id));
        localStorage.setItem('reader-home-subreddit', records.find(record => record.id === id)?.name!);
      }
    })
  )
// #endregion

// #region trackById
  trackById(index: number, record: FavSubreddit): number {
    return record.id;
  }
// #endregion

}
