import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";

export default function Grid({ currentDate, setCurrentDate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const startDay = getDay(start);

  function handleClick(day) {
    if (!startDate) {
      setStartDate(day);
    } else if (!endDate) {
      if (day < startDate) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  }

  function isInRange(day) {
    if (startDate && endDate) {
      return day >= startDate && day <= endDate;
    }
    return false;
  }

  function isStart(day) {
    return startDate && isSameDay(day, startDate);
  }

  function isEnd(day) {
    return endDate && isSameDay(day, endDate);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          ◀
        </button>

        <h2 className="font-bold text-lg">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          ▶
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">
        {[...Array(startDay)].map((_, i) => (
          <div key={i}></div>
        ))}

        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            className={`
              h-12 flex items-center justify-center
              rounded-lg cursor-pointer text-sm font-medium
              transition-all duration-200

              ${isStart(day) ? "bg-blue-600 text-white" : ""}
              ${isEnd(day) ? "bg-blue-600 text-white" : ""}
              ${isInRange(day) ? "bg-blue-200" : ""}
              
              ${!isStart(day) && !isEnd(day) ? "hover:bg-gray-200" : ""}
            `}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}
