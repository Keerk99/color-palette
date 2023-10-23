import "./style.css";

export default function ColorCard(props) {
  const { name, year, color, pantone_value } = props.color;

  return (
    <li className="card" style={{ background: color }} onClick={props.onClick}>
      <h3 className="card__year">{year}</h3>
      <div className="card__text-centered">
        <h2 className="card__name">{name}</h2>
        <p className="card__color">{color}</p>
      </div>
      <h4 className="card__pantone">{pantone_value}</h4>
    </li>
  );
}
