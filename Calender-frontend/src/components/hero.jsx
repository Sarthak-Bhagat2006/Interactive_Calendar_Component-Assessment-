import { dsaData } from "../data/dsaData";
import "../styles/Hero.css";
export default function Hero({ date }) {
  const month = date.getMonth();
  const data = dsaData[month] || dsaData[0];

  return (
    <div className="hero">
      <img src={data.image} />

      <div className="hero-overlay">
        <h2>{data.title}</h2>
        <p>
          {data.description} <a href={data.blog}>...blog</a>
        </p>
      </div>
    </div>
  );
}
