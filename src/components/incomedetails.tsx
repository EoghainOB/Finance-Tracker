import React, { useEffect, useState } from 'react'
import { incomeTypes } from '../types';

export type Props = {
    inc: incomeTypes;
} 

const Incomedetails = ({inc}: Props) => {

    const [isShownInc, setIsShownInc] = useState<boolean>(false);

    const changeIncomeEdit = () => {
        setIsShownInc(!isShownInc)
    };

    const [incomeForm, setIncomeForm] = useState<incomeTypes>({
        _id: 0,
        category: '',
        description: '',
        amount: 0,
        date: '',
        googleId: '',
    })

    useEffect(() => {
        setIncomeForm(inc)
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = e.target
        setIncomeForm({ ...incomeForm, [name]: value});
    }

    const updateIncome = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = incomeForm
        fetch(`http://localhost:8080/api/income/${inc._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    };

    return (
    <div>
         {!isShownInc && <li>
            <h5>{incomeForm.date}</h5>
            <h5>{incomeForm.category}</h5>
            <h3>{incomeForm.description}</h3>
            <h3>€ {incomeForm.amount.toFixed(2)}</h3>
            <button onClick={changeIncomeEdit}>Edit</button>
        </li>}
        {isShownInc && <form onSubmit={updateIncome}>
            <input type='date' name='date' value={incomeForm.date} onChange={handleChange}/>
            <input type='text' name='category' value={incomeForm.category} onChange={handleChange}/>
            <input type='text' name='description' value={incomeForm.description} onChange={handleChange}/>
            <input type='number' name='amount' value={incomeForm.amount} onChange={handleChange}/>
            <button type='submit'>Save</button>
            <button onClick={changeIncomeEdit}>Cancel</button>
        </form>}
    </div>
    )
}

export default Incomedetails
