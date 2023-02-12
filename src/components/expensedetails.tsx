import React, { useContext, useEffect, useState } from "react";
import { AllContextType, expenseTypes } from "../types";
import { AllContext } from "./context";

export type Props = {
  exp: expenseTypes;
};

const Expensedetails = ({ exp }: Props) => {
  const { setExpUpdate, expCategories, vatRates } = useContext(
    AllContext
  ) as AllContextType;

  const [isShownExp, setIsShownExp] = useState<boolean>(false);

  const changeExpenseEdit = () => {
    setIsShownExp(!isShownExp);
  };

  const [expenseForm, setExpenseForm] = useState<expenseTypes>({
    _id: 0,
    category: "",
    description: "",
    amount: 0,
    date: "",
    vat: 0,
    googleId: "",
  });

  useEffect(() => {
    setExpenseForm(exp);
  }, [exp]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setExpenseForm({ ...expenseForm, [name]: value });
  };

  const removeExpense = async (e: { preventDefault: () => void }) => {
    await fetch(`http://localhost:8080/api/expenses/${expenseForm._id}`, {
      method: "DELETE",
    }).then(() => {});
  };

  const updateExpense = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = expenseForm;
    fetch(`http://localhost:8080/api/expenses/${exp._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    changeExpenseEdit();
    setExpUpdate(data._id);
  };

  return (
    <div>
      {!isShownExp && (
        <li className="details">
          <div className="detailsDate">
            <h4>{expenseForm.date}</h4>
          </div>
          <div className="detailsCategory">
            <h4>{expenseForm.category}</h4>
          </div>
          <div className="detailsDescription">
            <h4>{expenseForm.description}</h4>
          </div>
          <div className="detailsAmount">
            <h4>€ {expenseForm.amount}</h4>
          </div>
          <div className="detailsButton">
            <button onClick={changeExpenseEdit}>Edit</button>
          </div>
        </li>
      )}
      {isShownExp && (
        <form className="details" onSubmit={updateExpense}>
          <div className="detailsDateInputExp">
            <input
              type="date"
              name="date"
              value={expenseForm.date}
              onChange={handleChange}
            />
          </div>
          <div className="detailsCategoryInputExp">
            <select name="category" onChange={handleChange}>
              <option value="">Choose</option>
              {expCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="detailsDescriptionInputExp">
            <input
              type="text"
              name="description"
              value={expenseForm.description}
              onChange={handleChange}
            />
          </div>
          <div className="detailsAmountInputExp">
            <input
              type="number"
              name="amount"
              value={expenseForm.amount}
              onChange={handleChange}
            />
          </div>
          <div className="detailsVatInputExp">
            <select name="vat" onChange={handleChange}>
              <option value="">Select</option>
              {vatRates.map((option) => (
                <option key={option} value={option}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
          <div className="detailsButtonInputExp">
            <button type="submit">Save</button>
            <button onClick={changeExpenseEdit}>Cancel</button>
            <button onClick={removeExpense}>Delete</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Expensedetails;
