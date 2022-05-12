import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  favSubreddits$: Observable<FavSubreddit[]> = this.service.getRecords()
// #endregion

// #region trackById
  trackById(index: number, record: FavSubreddit): number {
    return record.id;
  }
// #endregion

}
