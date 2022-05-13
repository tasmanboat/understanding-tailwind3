import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Subreddit } from 'src/app/reader/interfaces/subreddit';
import { Post } from 'src/app/reader/interfaces/post';
import { Reply } from 'src/app/reader/interfaces/reply';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  constructor(private http: HttpClient) { }

  getPost(subreddit: string, post: string): Observable<Post> {
    // https://www.reddit.com/r/Fijian/comments/pccxte/we_call_upon_reddit_to_take_action_against_the/
    // https://www.reddit.com/r/Fijian/comments/twiejk/hi_we_have_a_trip_planned_to_fiji_from_usa_from/
    const url = `https://www.reddit.com/r/${subreddit}/comments/${post}.json`;
    return this.http.get<Post>(url).pipe(
      tap(res => {
        // console.log((res as any)?.[0]?.kind);
      }),
      map(res => {
        const post: Post = this.parsePost((res as any)?.[0].data.children);
        const replies: Reply[] = this.getReplies((res as any)?.[1].data.children);
        post.replies = replies;
        return post;
      }),
      catchError(error => {
        // throw new Error(error)
        console.error('(PostApiService) post not found');
        return of({ title: '(post not found)', replies: [], subreddit: '', id: '' } as Post);
      })
    )
  }

  private parsePost(arr: any): Post {
    let nodes: Post[] = [];
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
        // topic = [...topic, obj];
        nodes.push(obj);
      }
    });
    const post = nodes.pop()!;
    return post;
  }

  private getReplies(arr: any): Reply[] {
    let replies: Reply[] = [];
    arr.forEach((item: any) => {
      if (item?.data?.created !== undefined) {
        const obj: Reply = {
          id: item.data.id,
          author: item.data.author,
          body: item.data.body,
          permalink: item.data.permalink,
          created: item.data.created,
          ups: item.data.ups
        };
        // replies = [...replies, obj];
        replies.push(obj);

        if (
          item?.data?.replies !== undefined &&
          item?.data?.replies !== ''
        ) {
          const arr = this.getReplies(item.data.replies.data.children);
          // replies = [...replies, ...arr];
          replies = replies.concat(arr);
        }
      }
    });
    return replies;
  }

}
