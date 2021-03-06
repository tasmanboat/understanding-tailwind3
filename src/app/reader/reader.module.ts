import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PostDetailsComponent } from './components/post-details/post-details.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';
import { FavPostsComponent } from './components/fav-posts/fav-posts.component';
import { FavSubredditsComponent } from './components/fav-subreddits/fav-subreddits.component';
import { PostRowComponent } from './components/post-row/post-row.component';
import { ReplyRowComponent } from './components/reply-row/reply-row.component';
import { FavPostButtonComponent } from './components/fav-post-button/fav-post-button.component';

@NgModule({
  declarations: [
    PostDetailsComponent,
    SubredditComponent,
    FavPostsComponent,
    FavSubredditsComponent,
    PostRowComponent,
    ReplyRowComponent,
    FavPostButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReaderRoutingModule,
  ]
})
export class ReaderModule { }
