import React, { useState, useContext } from "react";
import { AllContextType } from "../types";
import { AllContext } from "./context";

const Incomeform = ({ cancelForm }: any) => {
  const { incomeCategories, profile, setIncUpdate } = useContext(
    AllContext
  ) as AllContextType;

  const [category, setCategory] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const addIncome = async (e: React.MouseEvent<HTMLFormElement>) => {
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
      date: target.date.value,
      googleId: profile,
    };
    await fetch(`http://localhost:8080/api/income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIncUpdate(data._id);
    cancelForm();
  };

  return (
    <>
      <form className="incomeForm" onSubmit={addIncome}>
        <div className="inputIncDate">
          <label>Date</label>
          <input type="date" name="date" />
        </div>
        <div className="inputIncCategory">
          <label>Category</label>
          <select onChange={handleChange}>
            <option value="">Choose</option>
            {incomeCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="inputIncDescription">
          <label>Income Description</label>
          <input type="text" name="description" />
        </div>
        <div className="inputIncAmount">
          <label>Amount</label>
          <input type="number" name="amount" />
        </div>
        <br />
        <div className="inputIncButtons">
          <button type="submit">Submit</button>
          <button type="button" onClick={cancelForm}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Incomeform;
