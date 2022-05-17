import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { FavSubreddit } from "src/app/reader/interfaces/fav-subreddit";
import { FAV_SUBREDDITS } from './mock-fav-subreddits';
import { FavPost } from "src/app/reader/interfaces/fav-post";
import { FAV_POSTS } from './mock-fav-posts';
import { PersistentStorageService } from './persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor(private pss: PersistentStorageService) { }

// #region API endpoint
/*
GET /api/fav-subreddits
POST /api/fav-subreddits
GET /api/fav-subreddits/1
PUT /api/fav-subreddits/1
DELETE /api/fav-subreddits/1
*/
  async createDb() {
    // await this.pss.clearAsync();
    const data1 = await this.pss.getItemAsync('fav-subreddits') as string | null;
    const data2 = await this.pss.getItemAsync('fav-posts') as string | null;
    const favSubreddits = data1 ? JSON.parse(data1) : FAV_SUBREDDITS;
    const favPosts = data2 ? JSON.parse(data2) : FAV_POSTS;
    return { 'fav-subreddits': favSubreddits, 'fav-posts': favPosts };
  }
  // createDb() {
  //   return { 'fav-subreddits': FAV_SUBREDDITS, 'fav-posts': FAV_POSTS };
  // }
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
