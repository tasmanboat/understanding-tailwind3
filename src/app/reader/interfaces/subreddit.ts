import { Post } from './post';

export interface Subreddit {
  name: string;
  posts: Post[];
}
