import React, { useState, useContext } from "react";
import { AllContextType } from "../types";
import { AllContext } from "./context";

const Expenseform = ({ cancelForm }: any) => {
  const { expCategories, vatRates, profile, setExpUpdate } = useContext(
    AllContext
  ) as AllContextType;

  const [category, setCategory] = useState<string>();
  const [vat, setVat] = useState<number>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleVat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVat(+e.target.value);
  };

  const addExpense = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      description: { value: string };
      amount: { value: number };
      date: { value: string };
    };
    const data = {
      _id: Date.now(),
      category: category,
      description: target.description.value,
      amount: target.amount.value,
      vat: vat,
      date: target.date.value,
      googleId: profile,
    };
    await fetch(`http://localhost:8080/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setExpUpdate(data._id);
    cancelForm();
  };

  return (
    <form className="expenseForm" onSubmit={addExpense}>
      <div className="inputExpDate">
        <label>Date</label>
        <input type="date" name="date"></input>
      </div>
      <div className="inputExpCategory">
        <label>Category</label>
        <select onChange={handleChange}>
          <option value="">Choose</option>
          {expCategories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="inputExpDescription">
        <label>Description</label>
        <input type="text" name="description" />
      </div>
      <div className="inputExpAmount">
        <label>Amount</label>
        <input type="number" name="amount" />
      </div>
      <div className="inputExpVat">
        <label>VAT</label>
        <select onChange={handleVat}>
          <option value="">Select</option>
          {vatRates.map((option) => (
            <option key={option} value={option}>
              {option}%
            </option>
          ))}
        </select>
      </div>
      <div className="inputExpButtons">
        <button type="submit">Submit Expense</button>
        <button type="button" onClick={cancelForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Expenseform;
