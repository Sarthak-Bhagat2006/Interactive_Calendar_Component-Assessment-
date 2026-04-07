import { useState, useEffect } from "react";

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
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Notes</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your notes..."
      />

      <button
        onClick={handleSave}
        className="mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  );
}
