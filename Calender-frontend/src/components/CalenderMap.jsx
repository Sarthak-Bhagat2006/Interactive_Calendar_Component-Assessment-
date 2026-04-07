export default function CalenderMap({ hero, calendar, notes }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:grid md:grid-cols-3">
          <div className="md:col-span-2">{hero}</div>

          <div className="p-4 border-l bg-gray-50">{notes}</div>
        </div>

        <div className="p-4 border-t">{calendar}</div>
      </div>
    </div>
  );
}
