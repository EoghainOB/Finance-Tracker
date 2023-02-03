import { Date } from "mongoose";

export interface incomeTypes {
  _id: number;
  category: string;
  description: string;
  amount: number;
  date: Date;
  googleId: string;
}

export interface expenseTypes {
  _id: number;
  category: string;
  description: string;
  amount: number;
  vat: number;
  date: Date;
  googleId: string;
}

export interface userTypes {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
}
