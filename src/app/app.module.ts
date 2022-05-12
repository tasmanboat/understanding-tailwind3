import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';

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
    HttpClientModule,
    SharedModule,
    LayoutModule,
    CoreModule,
    // ReaderModule, // lazy load

// #region mock server
/*
The HttpClientInMemoryWebApiModule module intercepts HTTP requests
and returns simulated server responses.
Remove it when a real server is ready to receive requests.
*/
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true, delay: 500 }),
// #endregion

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
