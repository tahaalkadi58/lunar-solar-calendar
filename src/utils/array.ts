/**
 * Creates an array of numbers from start to end (inclusive)
 * @param start - The starting number
 * @param end - The ending number
 * @returns Array of numbers from start to end
 */
export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * Transforms an array of numbers into a matrix of week rows
 * @param arr - Array of numbers representing days
 * @returns Array of arrays, each representing a week row
 */
export const daysToCells = (arr: number[]): number[][] => {
  const result: number[][] = [];
  const weekCount = Math.ceil(arr.length / 7);
  
  for (let i = 0; i < weekCount; i++) {
    result.push(arr.slice(i * 7, (i + 1) * 7));
  }
  
  return result;
};

/**
 * Normalizes array values by replacing negative or zero values with 0
 * @param arr - Array of numbers to normalize
 * @returns Array with normalized values
 */
export const normalizeArray = (arr: number[]): number[] =>
  arr.map(num => num <= 0 ? 0 : num);

/**
 * Creates a calendar grid array based on month start day and total days
 * @param startDayIndex - Index of the first day of the month (0-6)
 * @param totalDays - Total number of days in the month
 * @returns Array representing the calendar grid
 */
export const createCalendarGrid = (startDayIndex: number, totalDays: number): number[] => {
  const grid: number[] = [];
  
  // Add empty cells for days before month start
  for (let i = 0; i < startDayIndex; i++) {
    grid.push(0);
  }
  
  // Add days of the month
  for (let i = 1; i <= totalDays; i++) {
    grid.push(i);
  }
  
  // Add empty cells to complete the last week
  const remainingCells = 7 - (grid.length % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      grid.push(0);
    }
  }
  
  return grid;
}; 