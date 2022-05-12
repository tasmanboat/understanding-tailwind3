import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  template: `
<div>
  <b>page not found</b>
  <a routerLink="" (click)="goBack()">back</a>
</div>
  `,
  styles: ['a { display: block; }']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
