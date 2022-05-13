import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { FavSubreddit } from '../../interfaces/fav-subreddit';
import { FavSubredditService } from '../../services/fav-subreddit.service';

@Component({
  selector: 'app-fav-subreddits',
  templateUrl: './fav-subreddits.component.html',
  styleUrls: ['./fav-subreddits.component.scss']
})
export class FavSubredditsComponent implements OnInit {

  constructor(private service: FavSubredditService) { }

  ngOnInit(): void {
  }

// #region records
  favSubreddits$: Observable<FavSubreddit[]> = this.service.getRecords().pipe(tap(_=>{
    console.log(_);
  }))
// #endregion

// #region update a record (toggle)
  onToggle(e: any, favSubreddit: FavSubreddit) {
    e.preventDefault();
    e.stopPropagation();
    if (favSubreddit.isPinned !== e.target.checked) {
      const _record = {...favSubreddit};
      _record.isPinned = e.target.checked;
      this.service.updateRecord(_record).subscribe();
    }
  }
// #endregion

// #region delete a record
  onDelete(e: any, favSubreddit: FavSubreddit) {
    e.preventDefault();
    e.stopPropagation();
    this.service.deleteRecord(favSubreddit.id).subscribe();
  }
// #endregion

// #region trackById
  trackById(index: number, record: FavSubreddit): number {
    return record.id;
  }
// #endregion

}
