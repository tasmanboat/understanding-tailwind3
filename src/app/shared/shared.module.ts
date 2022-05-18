import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink

// shared
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DecodeHTMLEntitiesPipe } from './pipes/decode-html-entities.pipe';
import { MarkdownPipe } from './pipes/markdown.pipe';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PeakComponent } from './components/peak/peak.component';
import { ModalComponent } from './components/modal/modal.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { PersistentStorageExportDirective } from './directives/persistent-storage-export.directive';
import { PersistentStorageImportDirective } from './directives/persistent-storage-import.directive';

@NgModule({
  declarations: [
    DateAgoPipe,
    DecodeHTMLEntitiesPipe,
    MarkdownPipe,
    PageNotFoundComponent,
    PeakComponent,
    ModalComponent,
    PersistentStorageExportDirective,
    PersistentStorageImportDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FormsModule, ReactiveFormsModule,
    NgxPaginationModule,

    DateAgoPipe,
    DecodeHTMLEntitiesPipe,
    MarkdownPipe,
    PageNotFoundComponent,
    PeakComponent,
    ModalComponent,
    PersistentStorageImportDirective,
    PersistentStorageExportDirective,
  ],
})
export class SharedModule { }
