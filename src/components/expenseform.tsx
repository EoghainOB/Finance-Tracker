import React, { useState, useContext } from 'react'
import { AllContextType } from '../types';
import { AllContext } from './context';

const Expenseform = () => {

const { expCategories, vatRates, setExpenses } = useContext(AllContext) as AllContextType

const [category, setCategory] = useState<string>();
const [vat, setVat] = useState<number>();

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
};

const handleVat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVat(+e.target.value);
};

  return (
    <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            description: { value: string };
            amount: { value: number };
            date: { value: string };
        };
        const data = {
            _id: Date.now(),
            category: category,
            description: target.description.value,
            amount: target.amount.value,
            vat: vat,
            date: target.date.value,
            googleId: 'string',
        }
        fetch(`http://localhost:8080/api/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(data)
        // setExpenses([data])
    }}>
    <label>Date</label>
    <input type="date" name='date'></input>
    <label>Category</label>
    <select onChange={handleChange}>
        <option value="">Choose</option>
            {expCategories.map(option => (
                <option key={option} value={option}>
                {option}
            </option>
            ))}
    </select>
    <br/>
    <label>Description</label>
    <input type="text" name='description'></input>
    <label>Amount</label>
    <input type="number" name='amount'></input>
    <br/>
    <label>VAT</label>
    <br/>
    <select onChange={handleVat}>
        <option value="">Select</option>
            {vatRates.map(option => (
                <option key={option} value={option}>
                {option}%
            </option>
            ))}
    </select>
    <button type="submit">Submit Expense</button>
</form>
  )
}

export default Expenseform
