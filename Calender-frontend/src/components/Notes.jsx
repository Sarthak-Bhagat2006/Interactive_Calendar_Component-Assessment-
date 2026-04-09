import { useState, useEffect } from "react";
import { format } from "date-fns";
import "../styles/Notes.css";

export default function Notes({ selectedDate }) {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  // LOAD NOTE WHEN DATE CHANGES
  useEffect(() => {
    if (!selectedDate) return;

    const key = selectedDate.toISOString().split("T")[0];

    const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};

    const existing = storedNotes[key] || "";

    setNote(existing);
    setSavedNote(existing);
  }, [selectedDate]);
  // SAVE NOTE
  function handleSaveNote() {
    if (!selectedDate) return;

    const key = selectedDate.toISOString().split("T")[0];

    let storedNotes = JSON.parse(localStorage.getItem("notes")) || {};

    storedNotes[key] = note;

    localStorage.setItem("notes", JSON.stringify(storedNotes));
    window.dispatchEvent(new Event("notesUpdated"));

    setSavedNote(note);
  }

  if (!selectedDate) {
    return (
      <div className="notes-container">
        <h3>Notes</h3>
        <p>Select a date to add notes</p>
      </div>
    );
  }

  return (
    <div className="notes-container">
      <h3>{format(selectedDate, "dd MMM yyyy")}</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your thoughts, mistakes, patterns..."
      />

      <button onClick={handleSaveNote}>Save</button>
      {savedNote && (
        <div className="saved-note">
          <p>{savedNote}</p>
        </div>
      )}
    </div>
  );
}
