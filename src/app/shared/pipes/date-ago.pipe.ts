import { Pipe, PipeTransform } from '@angular/core';

// To convert a timestamp string (the number of milliseconds since midnight 01 January, 1970 UTC) to date ago string
/*
dateInNumber = +new Date();
dateInNumber = new Date().getTime();
dateInNumber = Date.now();
dateInNumber = 1650770663000;
{{ dateInNumber - 38000 | dateAgo}} // 38 seconds ago
*/
@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      const seconds = Math.floor((+new Date() - +value) / 1000);
      if (seconds < 10) // less than 10 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: { [key: string]: number } = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }

}
