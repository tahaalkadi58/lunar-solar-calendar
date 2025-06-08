import React from "react";
import { CustomDateObject } from "../utils/date";
import { WEEKDAYS, MONTHS, ABBREVIATED_WEEKDAYS } from "../utils/gregorian-constants";
import moment from 'moment-hijri';

interface TableBodyProps {
  date: Date;
  isHijri: boolean;
  firstDayOfWeek: number;
  onDateSelect: (date: Date) => void;
}

export const TableBody: React.FC<TableBodyProps> = ({
  date,
  isHijri,
  firstDayOfWeek,
  onDateSelect,
}) => {
  const customDate = new CustomDateObject(date, WEEKDAYS, ABBREVIATED_WEEKDAYS, MONTHS);
  const { monthDayValue, weekDayValue, monthValue, year } = customDate;

  const handleCellClick = (dayNumber: number) => {
    let newDate: Date;
    if (isHijri) {
      const hijriDate = moment(date).iDate(dayNumber);
      newDate = hijriDate.toDate();
    } else {
      newDate = new Date(year, monthValue - 1, dayNumber);
    }
    onDateSelect(newDate);
  };

  // Maximum number of weeks possible in a month (6 weeks)
  const MAX_WEEKS = 6;
  const MAX_CELLS = MAX_WEEKS * 7;

  // Calculate first day of month
  let firstDay: number;
  if (isHijri) {
    const hijriDate = moment(date);
    const firstDayOfMonth = moment(hijriDate.format('iYYYY/iM/1'), 'iYYYY/iM/iD');
    firstDay = (firstDayOfMonth.day() - firstDayOfWeek + 7) % 7;
  } else {
    firstDay = (customDate.correctSortIndex - firstDayOfWeek + 7) % 7;
  }

  const monthLength = isHijri ? moment(date).iDaysInMonth() : customDate.monthDaysLength;
  const currentDate = isHijri ? moment(date).iDate() : monthDayValue;

  // Create empty cells for days before month start
  const notMonthDaysCells = Array.from({ length: firstDay }, (_, i) => (
    <div
      key={`empty-${i}`}
      id={`calendar-empty-cell-${i}`}
      className="w-full h-24 border-b border-r border-white/10"
    />
  ));

  // Create cells for the current month's days
  const MonthDaysCells = Array.from({ length: monthLength }, (_, i) => {
    const dayNumber = i + 1;
    const isActive = dayNumber === currentDate;
    const isFirstInRow = (i + firstDay) % 7 === 0;
    const rowIndex = Math.floor((i + firstDay) / 7);

    return (
      <div
        key={`day-${dayNumber}`}
        id={`calendar-day-cell-${dayNumber}`}
        onClick={() => handleCellClick(dayNumber)}
        className={`w-full h-24 flex items-center justify-center text-lg text-white relative border-b border-r border-white/10 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors
            ${isActive ? "active" : ""}
            ${isFirstInRow ? `overlined-neon-${rowIndex}` : ""}`}
      >
        <span className="relative z-10">{dayNumber}</span>
      </div>
    );
  });

  // Create empty cells for remaining days in the last week
  const remainingCells = MAX_CELLS - (firstDay + monthLength);
  const remainingDaysCells = Array.from({ length: remainingCells }, (_, i) => (
    <div
      key={`remaining-${i}`}
      id={`calendar-remaining-cell-${i}`}
      className="w-full h-24 border-b border-r border-white/10"
    />
  ));

  // Set CSS variables for styling
  document.documentElement.style.setProperty(
    "--table-height",
    MAX_WEEKS.toString()
  );
  document.documentElement.style.setProperty("--index", firstDay.toString());

  return (
    <div
      id="calendar-table-body"
      className="w-full grid grid-cols-7 grid-rows-6 h-[576px]"
      style={{ direction: isHijri ? "rtl" : "ltr" }}
    >
      {notMonthDaysCells}
      {MonthDaysCells}
      {remainingDaysCells}
    </div>
  );
};
