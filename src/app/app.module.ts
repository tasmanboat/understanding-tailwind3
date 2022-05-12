import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
// import { ReaderModule } from './reader/reader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    LayoutModule,
    CoreModule,
    // ReaderModule, // lazy load
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
