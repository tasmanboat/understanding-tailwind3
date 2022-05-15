import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FavPost } from "src/app/reader/interfaces/fav-post";
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavPostApiService {

  constructor(private http: HttpClient, private pss: PersistentStorageService) { }

  getRecords(): Observable<FavPost[]> {
    return this.http.get<FavPost[]>(this.recordsUrl).pipe(
      catchError(error => { throw new Error(error) })
    )
  }

  updateRecord(record: FavPost): Observable<any> {
    return this.http.put(this.recordsUrl, record, this.httpOptions).pipe(
      tap(_ => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  addRecord(record: FavPost): Observable<FavPost> {
    return this.http.post<FavPost>(this.recordsUrl, record, this.httpOptions).pipe(
      tap((newRecord: FavPost) => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  getRecord(id: number): Observable<FavPost> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.get<FavPost>(url).pipe(
      catchError(error => {
        console.error(`(record-api.service.ts) getRecord error`)
        throw new Error(error)
      })
    );
  }

  deleteRecord(id: number): Observable<FavPost> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.delete<FavPost>(url, this.httpOptions).pipe(
      tap(_ => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  private performSideEffect() {
    // side effect
    this.http.get<FavPost[]>(this.recordsUrl).subscribe(r => {
      const str = JSON.stringify(r);
      this.pss.setItemAsync('fav-posts', str); // not block
    })
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private recordsUrl = 'api/fav-posts';

}
