import { Pipe, PipeTransform } from '@angular/core';

/*
 * Pluralizes a string to the count
 * Takes a count argument that defaults to 2
 * Usage:
 *   value | pluralize:count
 * Example:
 *   {{ "second" | pluralize:2 }}
 *   formats to: seconds
*/
@Pipe({name: 'pluralize'})
export class PluralizePipe implements PipeTransform {
  transform(subject: string, count: string): string {
    let num = parseFloat(count);
    if ((isNaN(num) ? 2 : num) > 1) {
      let plural = subject.endsWith('y') || subject.endsWith('i') ? 'ies' : 's';
      return `${subject}${plural}`;
    }
    return subject;
  }
}