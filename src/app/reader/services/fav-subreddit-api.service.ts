import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FavSubreddit } from "src/app/reader/interfaces/fav-subreddit";
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavSubredditApiService {

  constructor(private http: HttpClient, private pss: PersistentStorageService) { }

  getRecords(): Observable<FavSubreddit[]> {
    return this.http.get<FavSubreddit[]>(this.recordsUrl).pipe(
      catchError(error => { throw new Error(error) })
    )
  }

  updateRecord(record: FavSubreddit): Observable<any> {
    return this.http.put(this.recordsUrl, record, this.httpOptions).pipe(
      tap(_ => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  addRecord(record: FavSubreddit): Observable<FavSubreddit> {
    return this.http.post<FavSubreddit>(this.recordsUrl, record, this.httpOptions).pipe(
      tap((newRecord: FavSubreddit) => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  getRecord(id: number): Observable<FavSubreddit> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.get<FavSubreddit>(url).pipe(
      catchError(error => {
        console.error(`(record-api.service.ts) getRecord error`)
        throw new Error(error)
      })
    );
  }

  deleteRecord(id: number): Observable<FavSubreddit> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.delete<FavSubreddit>(url, this.httpOptions).pipe(
      tap(_ => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  private performSideEffect() {
    // side effect
    this.http.get<FavSubreddit[]>(this.recordsUrl).subscribe(r => {
      const str = JSON.stringify(r);
      this.pss.setItemAsync('fav-subreddits', str); // not block
    })
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private recordsUrl = 'api/fav-subreddits';

}
