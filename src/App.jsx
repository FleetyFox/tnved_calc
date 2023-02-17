import React from "react";
import "./App.scss";
import { Converter } from "./components/Converter";
import { FoundItemsTable } from "./components/FoundItemsTable";
import { Reminder } from "./components/Reminder";
import tnved_table from "./json/tnved_table.json";
import { ReactComponent as CopyButtonSVG } from "./assets/svg/copyButton.svg";

function App() {
  const [code, setCode] = React.useState();
  const [weight, setWeight] = React.useState();
  const [foundItems, setFoundItems] = React.useState([]);
  const [sum, setSum] = React.useState();
  const [theme, setTheme] = React.useState("light");
  const [showAlert, setShowAlert] = React.useState(false);
  const [showConverter, setShowConverter] = React.useState(false);
  const [tons, setTons] = React.useState();
  const [isPercent, setIsPercent] = React.useState(false);

  React.useEffect(() => {
    if (code !== "") {
      setFoundItems(tnved_table.filter((v) => v.tnved_code.startsWith(code)));
    } else {
      setFoundItems([]);
    }
  }, [code, weight]);

  React.useEffect(() => {
    let result = (weight * (foundItems[0]?.coefficient * 3450)) / 1000;
    if (isPercent) {
      result = result * (1 + 12 / 100);
    }
    setSum(result.toFixed(2));
  }, [foundItems, isPercent]);

  React.useEffect(() => {
    setWeight(tons);
  }, [tons]);

  React.useEffect(() => {
    if (localStorage.getItem("percentSettings") != null) {
      setIsPercent(localStorage.getItem("percentSettings") === "true");
    }

    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
      setTheme("light");
    }
  }, []);

  const changeThemeHandler = () => {
    if (localStorage.getItem("theme") != "dark") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
      localStorage.removeItem("theme");
      setTheme("light");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="d-flex flex-column gap-4"></div>
        <div className="row mt-2 mb-4 d-flex flex-row align-items-center justify-content-between">
          <div className="col logo d-flex row align-items-baseline">
            <h1 className="mb-0 fw-bold">Калькулятор ТНВЭД</h1>
            <small className="fw-bold">{`by fleety <з`}</small>
          </div>
          <div className="col-md-4 text-nowrap btn-group">
            <button
              className={`btn btn-sm fw-bold ${showConverter ? "btn-accent-show" : "btn-accent"}`}
              onClick={() => setShowConverter(!showConverter)}
            >
              Конвертер
            </button>
            <button
              className={`btn btn-sm fw-bold ${showAlert ? "btn-accent-show" : "btn-accent"}`}
              onClick={() => setShowAlert(!showAlert)}
            >
              Памятка
            </button>
            <button className="btn btn-accent btn-sm fw-bold" onClick={changeThemeHandler}>
              {theme == "dark" ? "Светленькая" : "Темненькая"} тема
            </button>
          </div>
        </div>

        {showAlert && <Reminder />}
        {showConverter && <Converter setMainTons={setTons} />}

        <div className="card">
          <div className="card-header">Вводные данные</div>
          <div className="card-body d-flex flex-column gap-2">
            <label className="input-group">
              <span style={{ width: "120px", color: "#e48d97" }} className="input-group-text">
                Код ТНВЭД
              </span>
              <input
                className="form-control"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            <label className="input-group">
              <span style={{ width: "120px", color: "#e48d97" }} className="input-group-text">
                Вес
              </span>
              <input
                className="form-control"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <div className="form-check">
              <input
                id="addPercentCheck"
                className="form-check-input custom-checkbox"
                type="checkbox"
                name="addPercent"
                checked={isPercent}
                onChange={(e) => {
                  setIsPercent(e.target.checked);
                  localStorage.setItem("percentSettings", e.target.checked);
                }}
              />
              <label htmlFor="addPercentCheck" className="form-check-label">
                Прибавлять 12% к сумме
              </label>
            </div>
          </div>
        </div>
        <div className="card p-2 mt-2">
          <div className="card-body text-center">
            <h3 className="p-0 m-0 d-flex justify-content-center align-items-center">
              <span className="position-relative">
                {!isNaN(sum) ? sum + " тенге" : "пусто"}
                <button
                  style={{ color: "#e48d97" }}
                  title="Скопировать сумму"
                  className="position-absolute r-0 btn btn-sm ms-2 p-1"
                  onClick={() => {
                    sum && navigator.clipboard.writeText(sum);
                  }}
                >
                  <CopyButtonSVG />
                </button>
              </span>
            </h3>
            <span className="text-muted">стоимость</span>
            <div className="text-muted">
              {(weight || 0) +
                "*(" +
                (foundItems[0]?.coefficient || 0) +
                "*" +
                3450 +
                "/" +
                1000 +
                ")" +
                (isPercent ? "+12%" : "")}
            </div>
          </div>
        </div>
        <FoundItemsTable foundItems={foundItems} />
      </div>
    </div>
  );
}

export default App;
