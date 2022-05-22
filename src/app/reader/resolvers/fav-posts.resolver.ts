import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { FavPostApiService } from 'src/app/reader/services/fav-post-api.service';
import { FavPost } from 'src/app/reader/interfaces/fav-post';

// route
// { path: 'fav/subreddits', component: FavSubredditsComponent, resolve: { records: FavPostsResolver }}

@Injectable({
  providedIn: 'root'
})
export class FavPostsResolver implements Resolve<Observable<FavPost[]>> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FavPost[]> {
    return this.service.getRecords().pipe(
      tap(_ => console.log(`(FavPostsResolver)`)),
      catchError(_ => {
        console.error(`(FavPostsResolver) resolve error`),
        this.router.navigate(['/']);
        return EMPTY;
      })
    )
  }

  constructor(private service: FavPostApiService, private router: Router) { }

}
