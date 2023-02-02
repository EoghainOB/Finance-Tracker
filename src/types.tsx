import { Dispatch, SetStateAction } from "react";

export interface userTypes {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
}

export interface incomeTypes {
  _id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  googleId: string;
}

export interface expenseTypes {
  _id: number;
  category: string;
  description: string;
  amount: number;
  vat: number;
  date: string;
  googleId: string;
}

export type AllContextType = {
  profile: number;
  income: incomeTypes[];
  expenses: expenseTypes[];
  expCategories: string[];
  incomeCategories: string[];
  vatRates: number[];
  setExpenses: Dispatch<SetStateAction<expenseTypes[]>>;
  setIncome: Dispatch<SetStateAction<incomeTypes[]>>;
  setProfile: Dispatch<SetStateAction<string>>;
  setExpUpdate: Dispatch<SetStateAction<number>>;
  setIncUpdate: Dispatch<SetStateAction<number>>;
};
