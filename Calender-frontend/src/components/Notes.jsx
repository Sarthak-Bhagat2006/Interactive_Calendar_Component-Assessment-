import { useState, useEffect } from "react";
import "../styles/Notes.css";

export default function Notes() {
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("note");
    if (saved) setNote(saved);
  }, []);

  function handleSave() {
    localStorage.setItem("note", note);
  }

  return (
    <div className="notes">
      <h3>Notes</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
