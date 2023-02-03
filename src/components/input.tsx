import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <>
      {window.location.pathname !== "/overview" && (
        <div className="backbutton">
          <Link to="/overview">
            <h4>Back to Overview</h4>
          </Link>
        </div>
      )}
      <div className="addForm">
        <div className="addButtons">
          {window.location.pathname !== "/expenses" && (
            <button value="income" onClick={selectIncome}>
              Add Income
            </button>
          )}
          {window.location.pathname !== "/income" && (
            <button value="expense" onClick={selectExpense}>
              Add Expense
            </button>
          )}
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
    </>
  );
};

export default Input;
