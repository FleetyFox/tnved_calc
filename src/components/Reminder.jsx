import React from "react";

export const Reminder = () => {
  return (
    <div className="mt-2 alert alert-danger">
      <h5 className="alert-heading">Для подсчета утилизиционного сбора необходимо:</h5>
      <ol>
        <li>Вес нетто товара перевести из киллограммов в тонны</li>
        <li>Вес в тоннах умножить на коэффициет из таблицы</li>
        <li>Полученный результат умножить на МРП (3450 тенге)</li>
        <li>Прибавить 12%</li>
      </ol>
    </div>
  );
};
