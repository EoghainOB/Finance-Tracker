import React, { useState } from "react";
import Expenseform from "./expenseform";
import Incomeform from "./incomeform";

const Input = () => {
  const [form, setForm] = useState<string>("none");

  const selectIncome = () => {
    setForm("income");
  };

  const selectExpense = () => {
    setForm("expense");
  };

  const cancelForm = () => {
    setForm("none");
  };

  return (
    <div className="addForm">
      <div className="addButtons">
        <button value="income" onClick={selectIncome}>
          Income
        </button>
        <button value="expense" onClick={selectExpense}>
          Expense
        </button>
      </div>
      {form === "income" ? (
        <div className="formContainer">
          <Incomeform cancelForm={cancelForm} />
        </div>
      ) : (
        ""
      )}
      {form === "expense" ? (
        <div className="formContainer">
          <Expenseform cancelForm={cancelForm} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
