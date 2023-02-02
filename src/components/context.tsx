import React, { useEffect, useState, createContext } from "react";
import { AllContextType, expenseTypes, incomeTypes } from "../types";
import App from "../App";

export const AllContext = createContext<AllContextType | null>(null);

const Context = ({ children }: any) => {
  const [profile, setProfile] = useState<string>();
  const [expUpdate, setExpUpdate] = useState<number>();
  const [incUpdate, setIncUpdate] = useState<number>();

  const [income, setIncome] = useState<incomeTypes[]>([]);

  useEffect(() => {
    const incomeApi = async () => {
      const response = await fetch(`http://localhost:8080/api/income`);
      const data = await response.json();
      //@ts-ignore
      const filtered = data.filter((inc) => inc.googleId === profile);
      setIncome([...filtered]);
    };
    incomeApi();
  }, [profile, incUpdate]);

  const [expenses, setExpenses] = useState<expenseTypes[]>([]);

  useEffect(() => {
    const expenseApi = async () => {
      const response = await fetch(`http://localhost:8080/api/expenses`);
      const data = await response.json();
      //@ts-ignore
      const filtered = data.filter((exp) => exp.googleId === profile);
      setExpenses([...filtered]);
    };
    expenseApi();
  }, [profile, expUpdate]);

  const [expCategories] = useState<string[]>([
    "Meals & Entertainment",
    "Equipment",
    "Travel & Accommodation",
  ]);

  const [incomeCategories] = useState<string[]>([
    "Services",
    "Product",
    "Salary",
  ]);

  const [vatRates] = useState<number[]>([0, 19, 21]);

  return (
    //@ts-ignore
    <AllContext.Provider
      value={{
        expenses,
        setExpenses,
        income,
        setIncome,
        //@ts-ignore
        setIncUpdate,
        //@ts-ignore
        setExpUpdate,
        //@ts-ignore
        profile,
        //@ts-ignore
        setProfile,
        expCategories,
        incomeCategories,
        vatRates,
      }}
    >
      <App />
    </AllContext.Provider>
  );
};

export default Context;
