import React from "react";

export const FoundItemsTable = ({ foundItems }) => {
  return (
    <div className="card mt-4">
      <h4 className="card-header">Найдено по коду:</h4>
      <div className="card-body table-responsive">
        <table className="table">
          <thead>
            <tr className="text-nowrap">
              <th scope="col">Код</th>
              <th scope="col">Коэфф.</th>
              <th scope="col">Наименование</th>
              <th scope="col">Наименование продукции</th>
              <th scope="col">Раздел</th>
            </tr>
          </thead>
          <tbody>
            {foundItems.map((v, i) => (
              <tr className={i === 0 ? "table-active" : "fs-6"}>
                <th scope="row">{v.tnved_code}</th>
                <td>{v.coefficient}</td>
                <td>{i === 0 ? v.name : v.name.substring(100, -1) + "..."}</td>
                <td>{v.product_name}</td>
                <td>{v.chapter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
