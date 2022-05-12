import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutAppComponent } from './layout/layouts/layout-app/layout-app.component';
import { LayoutDefaultComponent } from './layout/layouts/layout-default/layout-default.component';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PeakComponent } from './shared/components/peak/peak.component';

const routes: Routes = [
  {
    path: 'rdr',
    component: LayoutAppComponent,
    children: [
      { path: '', loadChildren: () => import('src/app/reader/reader.module').then(m => m.ReaderModule) },
    ]
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: 'peak', component: PeakComponent },
      { path: '**', component: PageNotFoundComponent },  // 希望 pnf 也运用 layout
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
