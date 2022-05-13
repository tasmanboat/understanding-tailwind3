import { Component, Input, OnInit } from '@angular/core';
import { Reply } from 'src/app/reader/interfaces/reply';

@Component({
  selector: 'app-reply-row',
  templateUrl: './reply-row.component.html',
  styleUrls: ['./reply-row.component.scss']
})
export class ReplyRowComponent implements OnInit {
  @Input() reply!: Reply;
  @Input() isOP: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
