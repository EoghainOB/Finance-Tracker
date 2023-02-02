import React, { useContext } from "react";
import { AllContextType } from "../types";
import { AllContext } from "./context";
import Expensedetails from "./expensedetails";
import Input from "./input";

const Expensespage = () => {
  const { expenses } = useContext(AllContext) as AllContextType;

  return (
    <div>
      <h2>Add Income/Expense</h2>
      <ul>
        <Input />
      </ul>
      <h2>Income</h2>
      <ul>
        <li className="listdetails">
          <div className="detailsDate">
            <h4>Date</h4>
          </div>
          <div className="detailsCategory">
            <h4>Category</h4>
          </div>
          <div className="detailsDescription">
            <h4>Description</h4>
          </div>
          <div className="detailsAmount">
            <h4>Amount</h4>
          </div>
          <div className="detailsButton">
            <h4>Edit</h4>
          </div>
        </li>
        {expenses.map((exp, index) => (
          <div key={index}>
            <Expensedetails exp={exp} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Expensespage;
