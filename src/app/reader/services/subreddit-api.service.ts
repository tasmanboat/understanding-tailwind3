import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Subreddit } from 'src/app/reader/interfaces/subreddit';
import { Post } from 'src/app/reader/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class SubredditApiService {

  constructor(private http: HttpClient) { }

  getSubreddit(subreddit: string): Observable<Subreddit> {
    const url = `https://www.reddit.com/r/${subreddit}/.json`;
    return this.http.get<Subreddit>(url).pipe(
      tap(res => {
        // console.log((res as any)?.data?.after);
      }),
      map(res => {
        const subreddit = (res as any)?.data.children[0].data.subreddit;
        const posts = this.getPosts((res as any)?.data.children);
        return { name: subreddit, posts: posts } as Subreddit;
      }),
      catchError(error => {
        // throw new Error(error);
        console.error('(SubredditApiService) subreddit not found');
        return of({ name: '(subreddit not found)', posts: [] } as Subreddit);
      })
    )
  }

  private getPosts(arr: any): Post[] {
    let posts: Post[] = [];
    arr.forEach((item: any) => {
      if (item !== undefined) {
        const obj: Post = {
          id: item.data.id,
          author: item.data.author,
          // body: item.data.body,
          title: item.data.title,
          selftext: item.data.selftext,
          permalink: item.data.permalink,
          created: item.data.created,
          score: item.data.score,
          num_comments: item.data.num_comments,
          url: item.data.url,
          subreddit: item.data.subreddit,
          replies: [],
        };
        // posts = [...posts, obj];
        posts.push(obj);
      }
    });
    return posts;
  }
}
