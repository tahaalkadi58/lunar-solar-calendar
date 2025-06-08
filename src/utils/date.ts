import { range } from './array';
import { getOrdinalSuffix } from './string';
/**
 * Custom date object that provides calendar-specific date information
 */
export class CustomDateObject {
  readonly xlWeekDaysName: string[];
  readonly weekDaysName: string[];
  readonly yearMonthsName: string[];
  readonly weekDayValue: number;
  readonly weekDayName: string;
  readonly monthDayValue: number;
  readonly monthValue: number;
  readonly monthName: string;
  readonly year: number;
  readonly monthFirstDayName: string;
  readonly correctSortIndex: number;
  readonly monthDaysLength: number;
  readonly monthAllDays: number[];
  readonly displayDate: string;
  
  constructor(date: Date, public weekdays: string[], public abbr_weekdays: string[], public months: string[]) {
    this.xlWeekDaysName = weekdays;
    this.weekDaysName = abbr_weekdays;
    this.yearMonthsName = months;
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    // Get the last day of the month
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Set basic date properties
    this.year = date.getFullYear();
    this.monthValue = date.getMonth() + 1;
    this.monthName = this.yearMonthsName[this.monthValue - 1];
    this.monthDayValue = date.getDate();
    this.monthDaysLength = lastDayOfMonth.getDate();
    
    // Calculate week day values
    const day = date.getDay();
    this.weekDayValue = day === 0 ? 7 : day;
    this.weekDayName = this.weekDaysName[this.weekDayValue - 1];
    
    // Calculate first day of month
    const firstDay = firstDayOfMonth.getDay();
    this.monthFirstDayName = this.weekDaysName[firstDay === 0 ? 6 : firstDay - 1];
    this.correctSortIndex = firstDay === 0 ? 6 : firstDay - 1;
    
    // Generate array of days
    this.monthAllDays = range(1, this.monthDaysLength + 1);

    // Set display date
    this.displayDate = `${this.xlWeekDaysName[this.weekDayValue - 1]}, the ${this.monthDayValue}${getOrdinalSuffix(this.monthDayValue)} of ${this.monthName}, ${this.year}`;
  }
}

/**
 * Creates a new date object for the previous month
 * @param date - Current date
 * @returns Date object for the previous month
 */
export const getPreviousMonth = (date: Date): Date => {
  const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  return newDate;
};

/**
 * Creates a new date object for the next month
 * @param date - Current date
 * @returns Date object for the next month
 */
export const getNextMonth = (date: Date): Date => {
  const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return newDate;
}; 