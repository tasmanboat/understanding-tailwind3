import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FavPost } from 'src/app/reader/interfaces/fav-post';
import { FavPostApiService } from 'src/app/reader/services/fav-post-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavPostService {

  private records$: ReplaySubject<FavPost[]> = new ReplaySubject<FavPost[]>(1);
  constructor(private apiService: FavPostApiService) {
    this.loadRecords();
  }

  // load records for view
  private loadRecords() {
    this.apiService.getRecords().subscribe(records => {
      this.records$.next(records);
    })
  }

  // not sending network request, but read from cache in ReplaySubject
  getRecords(): Observable<FavPost[]> {
    return this.records$.asObservable()
  }
  getIsFav(permalink: string): Observable<boolean> {
    return this.records$.asObservable().pipe(
      map((records: FavPost[]) => records.some(r => r.permalink === permalink))
    )
  }
  getFavPostId(permalink: string): Observable<number> {
    return this.records$.asObservable().pipe(
      map((records: FavPost[]) => {
        let id = -1;
        records.some(record => {
          if (record.permalink === permalink) { id = record.id; return true } else { return false }
        })
        return id;
      })
    )
  }

  updateRecord(record: FavPost): Observable<any> {
    const timestamp = String(Date.now()).slice(0, -3);
    const modifiedRecord: FavPost = { ...record, updated_at: +timestamp };
    return this.apiService.updateRecord(modifiedRecord).pipe(tap(_ => this.loadRecords()))
  }

  addRecord(record: FavPost): Observable<FavPost> {
    const timestamp = String(Date.now()).slice(0, -3);
    const modifiedRecord: FavPost = { ...record, created_at: +timestamp, updated_at: -1 };
    return this.apiService.addRecord(modifiedRecord).pipe(tap(_ => this.loadRecords()))
  }

  getRecord(id: number): Observable<FavPost> {
    return this.apiService.getRecord(id).pipe(
      catchError(error => {
        console.error(`(record.service.ts) getRecord error`);
        return of({ id: -1, title: '(not found)', permalink: '', subreddit: '', created_at: -1, updated_at: -1 } as FavPost);
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

  deleteRecord(id: number): Observable<FavPost> {
    return this.apiService.deleteRecord(id).pipe(tap(_ => this.loadRecords()))
  }

}
