import React, { useContext } from "react";
import { AllContextType } from "../types";
import { AllContext } from "./context";
import Expensedetails from "./expensedetails";

const Expenses = () => {
  const { expenses } = useContext(AllContext) as AllContextType;

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((exp, index) => (
          <div key={index}>
            <Expensedetails exp={exp} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
