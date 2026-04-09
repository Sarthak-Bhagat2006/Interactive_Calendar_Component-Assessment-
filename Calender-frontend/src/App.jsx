import { useState } from "react";
import CalenderMap from "./components/CalenderMap";
import Hero from "./components/HeroSection";
import Grid from "./components/Grid";
import Notes from "./components/Notes";
import "./App.css";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <CalenderMap
      hero={<Hero date={currentDate} />}
      calendar={
        <Grid
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      }
      notes={<Notes selectedDate={selectedDate} />}
    ></CalenderMap>
  );
}
