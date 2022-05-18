import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPersistentStorageExport]'
})
export class PersistentStorageExportDirective {
  @Input() key: string = '';
  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.setExport();
  }
  private setExport() {
    const prettifiedJson = JSON.stringify(JSON.parse(localStorage.getItem(this.key)!), null, 2);
    this.el.nativeElement.href = 'data:application/json;charset=utf-8,'+ encodeURIComponent(prettifiedJson);
    this.el.nativeElement.download = `data_${this.key}_${new Date().toLocaleString().replace(/\/|\s|\\|\:/g, "_")}.json`;
  }

}
