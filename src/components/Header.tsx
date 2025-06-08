import React from "react";
import { CustomDateObject } from "../utils/date";
import { WEEKDAYS, MONTHS, ABBREVIATED_WEEKDAYS } from "../utils/gregorian-constants";
import { hijriWeekDays, hijriMonths } from "../utils/hijri-constants";
import { getOrdinalSuffix } from "../utils/string";
import moment from 'moment-hijri';

interface HeaderProps {
  date: Date;
  isHijri: boolean;
  onToggleCalendar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ date, isHijri }) => {
  const customDate = new CustomDateObject(date, WEEKDAYS, ABBREVIATED_WEEKDAYS, MONTHS);
  const { monthDayValue, weekDayValue, monthValue, year } = customDate;

  const displayDate = isHijri
    ? `${hijriWeekDays[date.getDay()]}، ${moment(date).iDate()} ${hijriMonths[moment(date).iMonth()]}، ${moment(date).iYear()} هـ`
    : `${customDate.xlWeekDaysName[weekDayValue - 1]}, ${monthDayValue}${getOrdinalSuffix(monthDayValue)} ${MONTHS[monthValue - 1]}, ${year}`;

  return (
    <div
      id="calendar-header"
      className="p-4 border-b border-white/10 text-white"
      style={{ direction: isHijri ? "rtl" : "ltr" }}
    >
      <div id="calendar-date" className="text-2xl font-semibold">
        {displayDate}
      </div>
    </div>
  );
};
