import { Reply } from './reply';

export interface Post {
  id: string;
  author?: string;
  title: string;
  selftext?: string;
  permalink: string;
  created?: number;
  score?: number;
  url?: string;
  replies: Reply[];
  num_comments?: number;
  subreddit: string;
}
