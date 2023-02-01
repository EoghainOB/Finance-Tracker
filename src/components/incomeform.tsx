import React, { useState, useContext } from 'react'
import { AllContextType } from '../types';
import { AllContext } from './context';

const Incomeform = () => {

const { incomeCategories } = useContext(AllContext) as AllContextType

const [category, setCategory] = useState<string>();

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
};

const addIncome = (e: React.MouseEvent<HTMLFormElement>) => {
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
        date: target.date.value,
        googleId: 'string',
    }
    fetch(`http://localhost:8080/api/income`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}

  return (
    <form onSubmit={addIncome}>
    <label>Date</label>
    <input type="date" name='date'></input>
    <label>Category</label>
    <select onChange={handleChange}>
        <option value="">Choose</option>
        {incomeCategories.map(option => (
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
    <button type="submit">Submit Income</button>
</form>
  )
}

export default Incomeform
