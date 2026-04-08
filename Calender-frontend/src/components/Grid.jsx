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
import { useState } from "react";
import "../styles/Grid.css";
import { problemsData } from "../data/problemData";

export default function Grid({ currentDate, setCurrentDate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const startDay = getDay(start);
  const [selectedProblem, setSelectedProblem] = useState(null);

  function handleClick(day) {
    // existing selection logic...

    const month = currentDate.getMonth();
    const problems = problemsData[month] || [];

    const found = problems.find((p) => p.day === day.getDate());

    setSelectedProblem(found || null);
  }

  function handlePrev() {
    const newDate = subMonths(currentDate, 1);
    if (newDate.getFullYear() === 2026) {
      setCurrentDate(newDate);
    }
  }

  function handleNext() {
    const newDate = addMonths(currentDate, 1);
    if (newDate.getFullYear() === 2026) {
      setCurrentDate(newDate);
    }
  }

  function getClass(day) {
    if (startDate && isSameDay(day, startDate)) return "day start";
    if (endDate && isSameDay(day, endDate)) return "day end";
    if (startDate && endDate && day > startDate && day < endDate)
      return "day range";
    return "day";
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrev}>
          <i class="fa-solid fa-circle-arrow-left"></i>
        </button>

        <h2>{format(currentDate, "MMMM yyyy")}</h2>

        <button onClick={handleNext}>
          <i class="fa-solid fa-circle-right"></i>
        </button>
      </div>

      <div className="days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid">
        {[...Array(startDay)].map((_, i) => (
          <div key={i}></div>
        ))}

        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            className={getClass(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
      {selectedProblem && (
        <div className="problem-box">
          <h3>🧠 Problem of the Day</h3>
          <p>{selectedProblem.title}</p>
          <a href={selectedProblem.link} target="_blank">
            Solve on LeetCode →
          </a>
        </div>
      )}
    </div>
  );
}
