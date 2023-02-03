import React, { useContext } from "react";
import { AllContextType } from "../types";
import { AllContext } from "./context";
import Incomedetails from "./incomedetails";
import Input from "./input";

const Incomepage = () => {
  const { income } = useContext(AllContext) as AllContextType;

  return (
    <div>
      <Input />
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
        {income.map((inc, index) => (
          <div key={index}>
            <Incomedetails inc={inc} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Incomepage;
