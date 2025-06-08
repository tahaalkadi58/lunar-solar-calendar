import React from "react";
import { CustomDateObject } from "../utils/date";
import { WEEKDAYS, MONTHS, ABBREVIATED_WEEKDAYS } from "../utils/gregorian-constants";
import { hijriWeekDays } from "../utils/hijri-constants";

interface TableHeadProps {
  date: Date;
  isHijri: boolean;
  firstDayOfWeek: number;
}

export const TableHead: React.FC<TableHeadProps> = ({ date, isHijri, firstDayOfWeek }) => {
  const customDate = new CustomDateObject(date, WEEKDAYS, ABBREVIATED_WEEKDAYS, MONTHS);
  const weekDays = isHijri ? hijriWeekDays : customDate.xlWeekDaysName;

  // Reorder weekdays based on firstDayOfWeek
  const reorderedWeekDays = [
    ...weekDays.slice(firstDayOfWeek),
    ...weekDays.slice(0, firstDayOfWeek),
  ];

  return (
    <div
      id="calendar-table-head"
      className="w-full grid grid-cols-7"
      style={{ direction: isHijri ? "rtl" : "ltr" }}
    >
      {reorderedWeekDays.map((day, index) => (
        <div
          key={index}
          id={`calendar-weekday-${index}`}
          className="text-white text-center py-2 font-bold"
        >
          {day}
        </div>
      ))}
    </div>
  );
};
