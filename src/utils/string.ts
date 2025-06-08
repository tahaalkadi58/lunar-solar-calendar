/**
 * Returns the appropriate ordinal suffix (st, nd, rd, th) for a number
 * @param day - The number to get the ordinal suffix for
 * @returns The ordinal suffix
 */
export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

/**
 * Extracts the first three letters of a weekday name from a date string
 * @param dateString - The date string to extract from
 * @returns The first three letters of the weekday name
 */
export const extractWeekdayAbbreviation = (dateString: string): string => {
  const match = dateString.match(/^(.{3})/);
  return match ? match[1] : '';
}; 