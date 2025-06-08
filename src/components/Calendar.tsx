import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import Button from "./shared/Button";
import { getPreviousMonth, getNextMonth } from "../utils/date";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-hijri';

export const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isHijri, setIsHijri] = useState<boolean>(false);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);


  const handlePrevMonth = () => {
    if (isHijri) {
      const hijriDate = moment(date).subtract(1, 'iMonth');
      setDate(hijriDate.toDate());
    } else {
      setDate(getPreviousMonth(date));
    }
  };

  const handleNextMonth = () => {
    if (isHijri) {
      const hijriDate = moment(date).add(1, 'iMonth');
      setDate(hijriDate.toDate());
    } else {
      setDate(getNextMonth(date));
    }
  };

  const handleDateSelect = (newDate: Date) => {
    setDate(newDate);
  };

  const toggleCalendar = () => {
    if (isHijri) {
      // Convert from Hijri to Gregorian
      const hijriDate = moment(date);
      const gregorianDate = moment(hijriDate.format('YYYY-MM-DD')).toDate();
      setDate(gregorianDate);
    } else {
      // Convert from Gregorian to Hijri
      const gregorianDate = moment(date);
      const hijriDate = moment(gregorianDate.format('YYYY-MM-DD')).toDate();
      setDate(hijriDate);
    }
    setIsHijri(!isHijri);
  };

  const handleFirstDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstDayOfWeek(Number(event.target.value));
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setFirstDayOfWeek(1);
      } else {
        setFirstDayOfWeek(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="calendar-container" className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-4 mb-4 justify-between w-full">
        <Header date={date} isHijri={isHijri} onToggleCalendar={toggleCalendar} />
        <div className="flex gap-2">
          <Button
            onClick={toggleCalendar}
            className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 hover:bg-white/30 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{isHijri ? "التقويم الميلادي" : "التقويم الهجري"}</span>
          </Button>
          <select
            id="first-day-select"
            value={firstDayOfWeek}
            onChange={handleFirstDayChange}
            className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20 hover:bg-white/30 transition-colors cursor-pointer focus:outline-none focus:border-white/40"
          >
            <option value={0} className="bg-zinc-800">الأحد</option>
            <option value={1} className="bg-zinc-800">الإثنين</option>
            <option value={2} className="bg-zinc-800">الثلاثاء</option>
            <option value={3} className="bg-zinc-800">الأربعاء</option>
            <option value={4} className="bg-zinc-800">الخميس</option>
            <option value={5} className="bg-zinc-800">الجمعة</option>
            <option value={6} className="bg-zinc-800">السبت</option>
          </select>
        </div>
      </div>
      <div id="calendar-grid" className="relative w-[800px] bg-gradient-to-b from-zinc-800/70 to-white/40 outline outline-1 outline-white/20 text-center grid grid-cols-1 rounded-xl text-white shadow-lg backdrop-blur-sm">
        <TableHead date={date} isHijri={isHijri} firstDayOfWeek={firstDayOfWeek} />
        <TableBody 
          date={date} 
          isHijri={isHijri}
          firstDayOfWeek={firstDayOfWeek} 
          onDateSelect={handleDateSelect}
        />
        <Button
          id="prev-month-btn"
          onClick={handlePrevMonth}
          className="btn prev absolute left-[-85px] top-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-white/50 text-white text-2xl font-bold flex items-center justify-center hover:bg-white/80 shadow-lg"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          id="next-month-btn"
          onClick={handleNextMonth}
          className="btn next absolute right-[-85px] top-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-white/50 text-white text-2xl font-bold flex items-center justify-center hover:bg-white/80 shadow-lg"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
};
