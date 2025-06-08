/**
 * Array of full weekday names in English
 */
export const WEEKDAYS: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Array of full month names in English
 */
export const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Array of abbreviated weekday names (first 3 letters)
 */
export const ABBREVIATED_WEEKDAYS: string[] = WEEKDAYS.map(day => day.substring(0, 3)); 