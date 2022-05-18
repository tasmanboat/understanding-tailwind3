import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPersistentStorageImport]'
})
export class PersistentStorageImportDirective {
  @Input() key: string = '';
  constructor(private el: ElementRef) { }

  @HostListener('change') onChange() {
    this.setImport();
  }
  private setImport() {
    try {
      const files = this.el.nativeElement?.files;
      // const files = $event.target.files[0];
      if (files.length <= 0) { return; }
      const file: File = files[0];
      const fileReader: FileReader = new FileReader();
      fileReader.onloadend = (e) => {
        // console.log(fileReader.result)
        // console.log(typeof fileReader.result) // string
        const data: any = JSON.parse(fileReader.result as string);
        this.setLocalStorage(this.key, data);
        window.location.reload();
      }
      if (file) { fileReader.readAsText(file) }
    } catch (err) {
      console.error(err);
    }
  }

  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  resetLocalStorage(): void {
    localStorage.removeItem(this.key);
    // localStorage.clear();
  }

}
