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

export default function Grid({
  currentDate,
  setCurrentDate,
  setSelectedDate,
  selectedDate,
}) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const startDay = getDay(start);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const today = new Date();

  function handleClick(day) {
    if (day > today) return;

    setSelectedDate(day);

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
    const isToday =
      isSameDay(day, today) &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    const isSelected = selectedDate && isSameDay(day, selectedDate);

    if (isToday) return "day today";

    if (isSelected) return "day selected";

    return "day";
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrev}>
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>

        <h2>{format(currentDate, "MMMM yyyy")}</h2>

        <button onClick={handleNext}>
          <i className="fa-solid fa-circle-right"></i>
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
            key={day.toISOString()}
            onClick={() => handleClick(day)}
            className={getClass(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
      {selectedProblem && (
        <div className="problem-box">
          <h3>Problem of the Day</h3>
          <p>{selectedProblem.title}</p>
          <a href={selectedProblem.link} target="_blank">
            Solve on LeetCode →
          </a>
        </div>
      )}
    </div>
  );
}
