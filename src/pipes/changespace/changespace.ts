import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ChangespacePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'changespace',
})
export class ChangespacePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let newValue = value.toString().replace(/\%8/gi, '/');
    // let newValue = value.toString().replace(/^\s\s*/, '_').replace(/\s\s*$/, '_')
    return newValue;
  }
}
