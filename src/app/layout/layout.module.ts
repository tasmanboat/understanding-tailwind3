import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink

import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    LayoutAppComponent,
    LayoutDefaultComponent,
    HeaderComponent,
    FooterComponent,
    // SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class LayoutModule { }
