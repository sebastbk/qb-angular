import { Pipe, PipeTransform } from '@angular/core';

const SECOND =        1000;
const MINUTE =   60 * SECOND;
const HOUR   =   60 * MINUTE;
const DAY    =   24 * HOUR;
const WEEK   =    7 * DAY;
const YEAR   =  365 * DAY;
const MONTH  = YEAR / 12; // average

/*
 * Converts the date to an age
 * Takes no arguments.
 * Usage:
 *   value | age
 * Example:
 *   depending on the current date
 *   may return one of the following
 *   - the future
 *   - just now (less than 30 seconds)
 *   - x second(s) ago
 *   - x minute(s) ago
 *   - x hour(s) ago (less than 12 hours)
 *   - today
 *   - yesterday
 *   - x day(s) ago
 *   - x week(s) ago
 *   - x month(s) ago
 *   - x year(s) ago
*/
@Pipe({name: 'age'})
export class AgePipe implements PipeTransform {
  pluralize(subject: string, count: number): string {
    return count > 1 ? subject + 's' : subject;
  }

  transform(value: string): string {
    let duration = Date.now() - new Date(value).getTime();
    if      (duration < 0) return 'the future';
    else if (duration < 30 * SECOND) return 'just now';
    else if (duration < MINUTE) {
      let seconds = Math.floor(duration / SECOND);
      return `${seconds} ${this.pluralize('second', seconds)} ago`;
    }
    else if (duration < HOUR) {
      let minutes = Math.floor(duration / MINUTE);
      return `${minutes} ${this.pluralize('minute', minutes)} ago`;
    }
    else if (duration < 0.5 * DAY) {
      let hours = Math.floor(duration / HOUR);
      return `${hours} ${this.pluralize('hour', hours)} ago`;
    }
    else if (duration < DAY) return 'today';
    else if (duration < 2 * DAY) return 'yesterday';
    else if (duration < WEEK) {
      let days = Math.floor(duration / DAY);
      return `${days} ${this.pluralize('day', days)} ago`;
    }
    else if (duration < MONTH) {
      let weeks = Math.floor(duration / WEEK);
      return `${weeks} ${this.pluralize('week', weeks)} ago`;
    }
    else if (duration < YEAR) {
      let months = Math.floor(duration / MONTH);
      return `${months} ${this.pluralize('month', months)} ago`;
    }
    else {
      let years = Math.floor(duration / YEAR);
      return `${years} ${this.pluralize('year', years)} ago`; 
    }
  }
}