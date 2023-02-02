import React, { useContext, useEffect, useState } from "react";
import { AllContextType, expenseTypes } from "../types";
import { AllContext } from "./context";

export type Props = {
  exp: expenseTypes;
};

const Expensedetails = ({ exp }: Props) => {
  const { setExpUpdate } = useContext(AllContext) as AllContextType;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setExpenseForm({ ...expenseForm, [name]: value });
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
          <div className="detailsDate">
            <input
              type="date"
              name="date"
              value={expenseForm.date}
              onChange={handleChange}
            />
          </div>
          <div className="detailsCategory">
            <input
              type="text"
              name="category"
              value={expenseForm.category}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDescription">
            <input
              type="text"
              name="description"
              value={expenseForm.description}
              onChange={handleChange}
            />
          </div>
          <div className="detailsAmount">
            <input
              type="number"
              name="amount"
              value={expenseForm.amount}
              onChange={handleChange}
            />
            <input
              type="number"
              name="vat"
              value={expenseForm.vat}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <div className="detailsButton">
            <button onClick={changeExpenseEdit}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Expensedetails;
