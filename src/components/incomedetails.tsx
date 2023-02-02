import React, { useContext, useEffect, useState } from "react";
import { AllContextType, incomeTypes } from "../types";
import { AllContext } from "./context";

export type Props = {
  inc: incomeTypes;
};

const Incomedetails = ({ inc }: Props) => {
  const { setIncUpdate } = useContext(AllContext) as AllContextType;

  const [isShownInc, setIsShownInc] = useState<boolean>(false);

  const changeIncomeEdit = () => {
    setIsShownInc(!isShownInc);
  };

  const [incomeForm, setIncomeForm] = useState<incomeTypes>({
    _id: 0,
    category: "",
    description: "",
    amount: 0,
    date: "",
    googleId: "",
  });

  useEffect(() => {
    setIncomeForm(inc);
  }, [inc]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setIncomeForm({ ...incomeForm, [name]: value });
  };

  const updateIncome = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = incomeForm;
    fetch(`http://localhost:8080/api/income/${inc._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    changeIncomeEdit();
    setIncUpdate(data._id);
  };

  return (
    <div>
      {!isShownInc && (
        <li className="details">
          <div className="detailsDate">
            <h4>{incomeForm.date}</h4>
          </div>
          <div className="detailsCategory">
            <h4>{incomeForm.category}</h4>
          </div>
          <div className="detailsDescription">
            <h4>{incomeForm.description}</h4>
          </div>
          <div className="detailsAmount">
            <h4>€ {incomeForm.amount}</h4>
          </div>
          <div className="detailsButton">
            <button onClick={changeIncomeEdit}>Edit</button>
          </div>
        </li>
      )}
      {isShownInc && (
        <form className="details" onSubmit={updateIncome}>
          <div className="detailsDate">
            <input
              type="date"
              name="date"
              value={incomeForm.date}
              onChange={handleChange}
            />
          </div>
          <div className="detailsCategory">
            <input
              type="text"
              name="category"
              value={incomeForm.category}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDescription">
            <input
              type="text"
              name="description"
              value={incomeForm.description}
              onChange={handleChange}
            />
          </div>
          <div className="detailsAmount">
            <input
              type="number"
              name="amount"
              value={incomeForm.amount}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <div className="detailsButton">
            <button onClick={changeIncomeEdit}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Incomedetails;
