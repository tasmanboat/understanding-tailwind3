import { Pipe, PipeTransform } from '@angular/core';

// To convert HTML entities in the string to their corresponding characters
@Pipe({
  name: 'decodeHTMLEntities'
})
export class DecodeHTMLEntitiesPipe implements PipeTransform {

  transform(value: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = value;
    return txt.value;
  }

}
