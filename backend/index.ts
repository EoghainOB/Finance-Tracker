import express from "express";
import { Application } from "express";
import { Schema, model, connect } from "mongoose";
import { incomeTypes, expenseTypes, userTypes } from "./types";
const cors = require("cors");
require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await connect(
    `mongodb+srv://Eoghain:${process.env.REACT_APP_PASS}@cluster0.sdqzzhz.mongodb.net/finance?retryWrites=true&w=majority`
  );

  const incomeSchema = new Schema<incomeTypes>({
    _id: Number,
    category: String,
    description: String,
    amount: Number,
    date: String,
    googleId: String,
  });

  const Income = model("Income", incomeSchema);

  app.get("/api/income", async (_req, res) => {
    try {
      const allIncome = await Income.find();
      res.status(200).json(allIncome);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.get("/api/income/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const singleIncome = await Income.findById(id);
      res.status(200).json(singleIncome);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.put("/api/income/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedIncome = await Income.findByIdAndUpdate(id, { ...req.body });
      res.status(201).json(updatedIncome);
    } catch (err) {
      res.status(400);
    }
  });

  app.post("/api/income", async (req, res) => {
    try {
      const newIncome = new Income({ ...req.body });
      await newIncome.save();
      res.status(200).json(newIncome);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.delete("/api/income/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const removeIncome = await Income.findByIdAndDelete(id);
      res.json(removeIncome);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  const expenseSchema = new Schema<expenseTypes[]>([
    {
      _id: Number,
      category: String,
      description: String,
      amount: Number,
      vat: Number,
      date: String,
      googleId: String,
    },
  ]);

  const Expenses = model("Expenses", expenseSchema);

  app.get("/api/expenses", async (_req, res) => {
    try {
      const allExpenses = await Expenses.find();
      res.json(allExpenses);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.get("/api/expenses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const singleExpense = await Expenses.findById(id);
      res.status(200).json(singleExpense);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.post("/api/expenses", async (req, res) => {
    try {
      const newExpense = new Expenses({ ...req.body });
      await newExpense.save();
      res.json(newExpense);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.put("/api/expenses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedExpense = await Expenses.findByIdAndUpdate(id, {
        ...req.body,
      });
      res.status(201).json(updatedExpense);
    } catch (err) {
      res.status(400);
    }
  });

  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const removeExpense = await Expenses.findByIdAndDelete(id);
      res.json(removeExpense);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  const userSchema = new Schema<userTypes[]>([
    {
      email: String,
      familyName: String,
      givenName: String,
      googleId: String,
      imageUrl: String,
      name: String,
    },
  ]);

  const Users = model("Users", userSchema);

  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const singleUser = await Users.findById(id);
      res.status(200).json(singleUser);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const id = req.body.googleId;
      //@ts-ignore
      const user = await Users.find({ googleId: id });
      if (user.length > 0) {
        res.json(user);
      } else {
        const newUser = new Users({ ...req.body });
        await newUser.save();
        res.json(newUser);
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.use((_req, res) => res.status(404).send("404 Not Found"));
}

export default app;
