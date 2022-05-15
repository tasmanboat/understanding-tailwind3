import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FavSubreddit } from 'src/app/reader/interfaces/fav-subreddit';
import { FavSubredditApiService } from 'src/app/reader/services/fav-subreddit-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavSubredditService {

  private records$: ReplaySubject<FavSubreddit[]> = new ReplaySubject<FavSubreddit[]>(1);
  constructor(private apiService: FavSubredditApiService) {
    this.loadRecords();
  }

  // load records for view
  private loadRecords() {
    this.apiService.getRecords().subscribe(records => {
      this.records$.next(records);
    })
  }

  // not sending network request, but read from cache in ReplaySubject
  getRecords(): Observable<FavSubreddit[]> {
    return this.records$.asObservable()
  }
  getIsFav(name: string): Observable<boolean> {
    return this.records$.asObservable().pipe(
      map((records: FavSubreddit[]) => records.some(r => r.name === name))
    )
  }
  getFavSubredditId(name: string): Observable<number> {
    return this.records$.asObservable().pipe(
      map((records: FavSubreddit[]) => {
        let id = -1;
        records.some(record => {
          if (record.name === name) { id = record.id; return true } else { return false }
        })
        return id;
      })
    )
  }

  updateRecord(record: FavSubreddit): Observable<any> {
    const timestamp = String(Date.now()).slice(0, -3);
    const modifiedRecord: FavSubreddit = { ...record, updated_at: +timestamp };
    return this.apiService.updateRecord(modifiedRecord).pipe(tap(_ => this.loadRecords()))
  }

  addRecord(record: FavSubreddit): Observable<FavSubreddit> {
    const timestamp = String(Date.now()).slice(0, -3);
    const modifiedRecord: FavSubreddit = { ...record, isPinned: true, created_at: +timestamp, updated_at: -1 };
    return this.apiService.addRecord(modifiedRecord).pipe(tap(_ => this.loadRecords()))
  }

  getRecord(id: number): Observable<FavSubreddit> {
    return this.apiService.getRecord(id).pipe(
      catchError(error => {
        console.error(`(record.service.ts) getRecord error`);
        return of({ id: -1, name: '(not found)', created_at: -1, updated_at: -1 } as FavSubreddit);
      })
    )
  }

  // not sending network request, instead read from cache in ReplaySubject
  // due to its dependence on this.records$ stream, it may trigger splash error in the create record scenario
  /*
  getRecord(id: number): Observable<Record> {
    return this.records$.asObservable().pipe(
      map(records => {
        const record = records.filter(r => r.id === id).pop()!;
        if (!record) { return { id: -1, content: '', isCompleted: false } as Record }
        return record;
      })
    )
  }
  */

  deleteRecord(id: number): Observable<FavSubreddit> {
    return this.apiService.deleteRecord(id).pipe(tap(_ => this.loadRecords()))
  }

}
