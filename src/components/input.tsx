import React, { useState } from "react";
import Expenseform from "./expenseform";
import Incomeform from "./incomeform";

const Input = () => {
  const [form, setForm] = useState<string>();

  const selectIncome = () => {
    setForm("income");
  };

  const selectExpense = () => {
    setForm("expense");
  };

  return (
    <div className="addbuttons">
      <button value="income" onClick={selectIncome}>
        Income
      </button>
      <button value="expense" onClick={selectExpense}>
        Expense
      </button>
      {form === "income" ? <Incomeform /> : ""}
      {form === "expense" ? <Expenseform /> : ""}
    </div>
  );
};

export default Input;
