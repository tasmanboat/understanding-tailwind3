import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';


import { FavPostsComponent } from './components/fav-posts/fav-posts.component';
import { FavSubredditsComponent } from './components/fav-subreddits/fav-subreddits.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';

// #region intention of routing
/*
const routes: Routes = [
  // g1
  { path: '', component: SubredditComponent },
  { path: '', component: PostDetailsComponent, outlet: 'content' },
  // g2
  { path: 'r/:subreddit', component: SubredditComponent },
  { path: 'r/:subreddit', component: PostDetailsComponent, outlet: 'content' },
  // g3
  { path: 'fav/posts', component: FavPostsComponent },
  { path: 'fav/posts', component: PostDetailsComponent, outlet: 'content' },
  // g4
  { path: 'fav/subreddits', component: FavSubredditsComponent },
  { path: 'fav/subreddits', component: undefined, outlet: 'content' },

  // patch the outlet (for the layout)
  // { path: '', component: PostDetailsComponent, outlet: 'content' },
];
*/
// #endregion

// #region url matcher
const subredditMatcher = (segments: UrlSegment[]): UrlMatchResult => {
  if (segments.length === 2 && segments[0].path === 'r') {
    return {
      consumed: segments,
      posParams: {
        subreddit: segments[1]
      }
    }
  }
  if (segments.length === 5 && segments[0].path === 'r' && segments[2].path === 'comments') {
    return {
      consumed: segments,
      posParams: {
        subreddit: segments[1],
        postId: segments[3],
        postTitle: segments[4],
      }
    }
  }
  return <UrlMatchResult>(null as any);
}
// #endregion

// #region implementation of routing
const routes: Routes = [
  { path: '', component: PostDetailsComponent, outlet: 'content' },
  { path: '', component: SubredditComponent },
  // { path: 'r/:subreddit/comments/:postId/:postTitle', component: SubredditComponent },
  // { path: 'r/:subreddit', component: SubredditComponent },
  { matcher: subredditMatcher, component: SubredditComponent },
  { path: 'fav/posts', component: FavPostsComponent },
  { path: 'fav/subreddits', component: FavSubredditsComponent },

  // { path: 'r/:subreddit/comments/:postId/:postTitle', component: PostDetailsComponent, outlet: 'content' },
  // { path: 'r/:subreddit', component: PostDetailsComponent, outlet: 'content' },
  // { path: 'fav/posts', component: PostDetailsComponent, outlet: 'content' },
  // { path: 'fav/subreddits', component: PostDetailsComponent, outlet: 'content' },
];
// #endregion


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaderRoutingModule { }
