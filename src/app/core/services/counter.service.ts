import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, first, delay } from 'rxjs/operators';
import { Counter } from 'src/app/core/interfaces/counter';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counter$: BehaviorSubject<Counter>;
  constructor() {
    const initState: Counter = { counter: 0, step: 1 };
    this.counter$ = new BehaviorSubject(initState);
  }

  increment(step: number) {
    this.counter$.pipe(first()).subscribe(data => {
      let state = data;
      state = { step: step, counter: state.counter+step };
      this.counter$.next(state);
    });
  }

  decrement(step: number) {
    this.counter$.pipe(first()).subscribe(data => {
      let state = data;
      state = { step: step, counter: state.counter-step };
      this.counter$.next(state);
    });
  }

  getCounter(): Observable<Counter> {
    return this.counter$.asObservable().pipe(delay(FETCH_LATENCY))
  }

}

const FETCH_LATENCY = 1000;
