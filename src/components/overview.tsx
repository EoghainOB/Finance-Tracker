import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AllContextType } from "../types";
import { AllContext } from "./context";
import Expensedetails from "./expensedetails";
import Incomedetails from "./incomedetails";
import Input from "./input";

const Overview = () => {
  const { expenses, income } = useContext(AllContext) as AllContextType;

  return (
    <div>
      <ul>
        <Input />
      </ul>
      <div className="category">
        <h2>Income</h2>
      </div>
      <ul className="incomeContainer">
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
            <h4>Update</h4>
          </div>
        </li>
        {income.slice(0, 5).map((inc, index) => (
          <div key={index}>
            <Incomedetails inc={inc} />
          </div>
        ))}
        <Link to="/income">
          <div className="pagelink">
            <h4>View all</h4>
          </div>
        </Link>
      </ul>
      <div className="category">
        <h2>Expenses</h2>
      </div>
      <ul className="expenseContainer">
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
            <h4>Update</h4>
          </div>
        </li>
        {expenses.slice(0, 5).map((exp, index) => (
          <div key={index}>
            <Expensedetails exp={exp} />
          </div>
        ))}
        <div className="pagelink">
          <Link to="/expenses">
            <h4>View all</h4>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Overview;
