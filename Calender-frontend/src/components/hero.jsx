import { dsaData } from "../data/dsaData";

export default function Hero({ date }) {
  const month = date.getMonth();
  const data = dsaData[month] || dsaData[0];

  return (
    <div className="relative h-64 md:h-72">
      <img src={data.image} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
        <h2 className="text-white text-2xl font-bold">{data.title}</h2>
        <p className="text-gray-200 text-sm">{data.description}</p>
      </div>
    </div>
  );
}
