import React from "react";

export function Converter({ setMainTons }) {
  const [kilograms, setKilograms] = React.useState();
  const [tons, setTons] = React.useState();

  const kilogramsHandler = (value) => {
    setKilograms(value);
    setTons(value / 1000);
    setMainTons(value / 1000);
  };
  const tonsHandler = (value) => {
    setTons(value);
    setKilograms(value * 1000);
  };

  return (
    <div className="card mb-2">
      <div className="card-header">Конвертер</div>
      <div className="card-body d-flex flex-row gap-2">
        <label className="input-group">
          <span style={{ color: "#e48d97" }} className="input-group-text">
            Кг
          </span>
          <input
            className="form-control"
            type="text"
            value={kilograms}
            onChange={(e) => kilogramsHandler(e.target.value)}
          />
        </label>
        <label className="input-group">
          <span style={{ color: "#e48d97" }} className="input-group-text">
            Тонны
          </span>
          <input
            className="form-control"
            type="text"
            value={tons}
            onChange={(e) => tonsHandler(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
