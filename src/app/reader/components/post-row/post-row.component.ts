import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/reader/interfaces/post';

@Component({
  selector: 'app-post-row',
  templateUrl: './post-row.component.html',
  styleUrls: ['./post-row.component.scss']
})
export class PostRowComponent implements OnInit {
  @Input() post!: Post;
  constructor() { }

  ngOnInit(): void {
  }

}
