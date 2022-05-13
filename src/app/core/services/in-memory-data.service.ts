import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { FavSubreddit } from "src/app/reader/interfaces/fav-subreddit";
import { FAV_SUBREDDITS } from './mock-fav-subreddits';
import { FavPost } from "src/app/reader/interfaces/fav-post";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

// #region API endpoint
/*
GET /api/fav-subreddits
POST /api/fav-subreddits
GET /api/fav-subreddits/1
PUT /api/fav-subreddits/1
DELETE /api/fav-subreddits/1
*/
  createDb() {
    return { 'fav-subreddits': FAV_SUBREDDITS, 'fav-posts': [] };
  }
// #endregion

  genId<T extends FavSubreddit | FavPost>(records: T[]): number {
    return records.length > 0 ? Math.max(...records.map(record => record.id))+1 : 11;
  }

  responseInterceptor(res: ResponseOptions, ri: RequestInfo): ResponseOptions {
    // console.log((ri as any)?.url);
    // console.log((ri as any)?.method);
    // console.log(res.body);
    // console.log(Array.isArray(res.body));
    return res;
  }

}
