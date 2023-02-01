import React, { useEffect, useState } from 'react'
import { expenseTypes } from '../types';

export type Props = {
  exp: expenseTypes;
} 

const Expensedetails = ({exp}: Props) => {

    const [isShownExp, setIsShownExp] = useState<boolean>(false);

    const changeExpenseEdit = () => {
        setIsShownExp(!isShownExp)
    };

    const [expenseForm, setExpenseForm] = useState<expenseTypes>({
        _id: 0,
        category: '',
        description: '',
        amount: 0,
        date: '',
        vat: 0,
        googleId: '',
    })

    useEffect(() => {
        setExpenseForm(exp)
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = e.target
        setExpenseForm({ ...expenseForm, [name]: value});
    }

    const updateExpense = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = expenseForm
        fetch(`http://localhost:8080/api/income/${exp._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    };

    return (
    <div>
        {!isShownExp && <li>
            <h5>{exp.date}</h5>
            <h5>{exp.category}</h5>
            <h3>{exp.description}</h3>
            <h3>€ {exp.amount.toFixed(2)}</h3>
            <button onClick={changeExpenseEdit}>Edit</button>
        </li>}
        {isShownExp && <form onSubmit={updateExpense}>
            <input type='date' name='date' value={expenseForm.date} onChange={handleChange}/>
            <input type='text' name='category' value={expenseForm.category} onChange={handleChange}/>
            <input type='text' name='description' value={expenseForm.description} onChange={handleChange}/>
            <input type='number' name='amount' value={expenseForm.amount} onChange={handleChange}/>
            <input type='number' name='vat' value={expenseForm.vat} onChange={handleChange}/>
            <button type='submit'>Save</button>
            <button onClick={changeExpenseEdit}>Cancel</button>
        </form>}
    </div>
    )
}

export default Expensedetails
