import { useState } from "react";
import CalenderMap from "./components/CalenderMap";
import Hero from "./components/Hero";
import Grid from "./components/Grid";
import Notes from "./components/Notes";
import "./App.css";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <CalenderMap
      hero={<Hero date={currentDate} />}
      calendar={
        <Grid currentDate={currentDate} setCurrentDate={setCurrentDate} />
      }
      notes={<Notes />}
    ></CalenderMap>
  );
}
