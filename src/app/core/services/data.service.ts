import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getLuckyNum(): Observable<number> {
    const url = `https://api.icndb.com/jokes/random`;
    return this.http.get<number>(url).pipe(
      // tap(_ => console.log(_)),
      // map(res => (res as any)?.value?.joke),
      map(res => (res as any)?.value?.id),
    );
  }

  getJoke(): Observable<string> {
    const url = `https://api.icndb.com/jokes/random`;
    return this.http.get<string>(url).pipe(
      map(res => (res as any)?.value?.joke),
      catchError(error => { throw new Error(error) })
    )
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

}
