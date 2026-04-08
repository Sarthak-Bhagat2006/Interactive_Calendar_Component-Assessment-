import "../styles/CalenderMap.css";
export default function CalenderMap({ hero, calendar, notes }) {
  return (
    <div className="container">
      <div className="card">
        {/* HERO */}
        {hero}

        {/* BOTTOM SECTION */}
        <div className="bottom-section">
          {notes}

          {calendar}
        </div>
      </div>
    </div>
  );
}
