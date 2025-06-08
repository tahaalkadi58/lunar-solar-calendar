declare module 'hijri-date' {
  class HijriDate extends Date {
    constructor(year?: number, month?: number, date?: number);
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
    getDay(): number;
    setFullYear(year: number): number;
    setMonth(month: number): number;
    setDate(date: number): number;
  }
  export default HijriDate;
}