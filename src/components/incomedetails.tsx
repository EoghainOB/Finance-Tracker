import React, { useContext, useEffect, useState } from "react";
import { AllContextType, incomeTypes } from "../types";
import { AllContext } from "./context";

export type Props = {
  inc: incomeTypes;
};

const Incomedetails = ({ inc }: Props) => {
  const { setIncUpdate, incomeCategories } = useContext(
    AllContext
  ) as AllContextType;

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

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setIncomeForm({ ...incomeForm, [name]: value });
  };

  const removeIncome = async (e: { preventDefault: () => void }) => {
    await fetch(`http://localhost:8080/api/income/${incomeForm._id}`, {
      method: "DELETE",
    }).then(() => {});
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
          <div className="detailsDateInputInc">
            <input
              type="date"
              name="date"
              value={incomeForm.date}
              onChange={handleChange}
            />
          </div>
          <div className="detailsCategoryInputInc">
            <select name="category" onChange={handleChange}>
              <option value="">Choose</option>
              {incomeCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="detailsDescriptionInputInc">
            <input
              type="text"
              name="description"
              value={incomeForm.description}
              onChange={handleChange}
            />
          </div>
          <div className="detailsAmountInputInc">
            <input
              type="number"
              name="amount"
              value={incomeForm.amount}
              onChange={handleChange}
            />
          </div>
          <div className="detailsButtonInputInc">
            <button type="submit">Save</button>
            <button onClick={changeIncomeEdit}>Cancel</button>
            <button onClick={removeIncome}>Delete</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Incomedetails;
