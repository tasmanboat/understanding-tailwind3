import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logs: string[] = [];
  private logs$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.logs);
  constructor() {
  }

  addLog(log: string): void {
    this.logs = [...this.logs, log];
    this.logs$.next(this.logs);
  }

  clearLogs(): void {
    this.logs = [];
    this.logs$.next(this.logs);
  }

  getLogs(): Observable<string[]> {
    return this.logs$.asObservable();
  }

}
