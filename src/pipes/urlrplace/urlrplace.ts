import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlrplace',
})
export class UrlrplacePipe implements PipeTransform {

  transform(value: string, ...args) {
    let newValue = value.replace(/\%8/gi, '/');
    return newValue;
  }
}
