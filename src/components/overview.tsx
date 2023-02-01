import React, { useContext, useState } from 'react';
import { AllContextType } from '../types';
import { AllContext } from './context';
import Input from './input';

const Overview = () => {

  const { expenses, income } = useContext(AllContext) as AllContextType

  const [ edit, setEdit ] = useState<boolean>(false)

  const changeEdit = () => {
    setEdit(true);
    };

  return (
    <div>
    <h2>Add Income/Expense</h2>
    <ul>
        <Input />
    </ul>
    <h2>Income</h2>
    <ul>
        {income.slice(-5).map((exp, index) => (
        <div key={index}>
            <li>
                <h5>{exp.date}</h5>
                <h5>{exp.category}</h5>
                <h3>{exp.description}</h3>
                <h3>€ {exp.amount.toFixed(2)}</h3>
                <button onClick={changeEdit}>Edit</button>
            </li>
            <form>
                <input value={exp.date}/>
                <input value={exp.category}/>
                <input value={exp.description}/>
                <input value={exp.amount.toFixed(2)}/>
                <button onClick={changeEdit}>Save</button>
            </form>
        </div>
        ))
        }
    </ul>
    <h2>Expenses</h2>
    <ul>
        {expenses.slice(-5).map((exp, index) => (
        <li key={index}>
        <h5>{exp.date}</h5>
        <h5>{exp.category}</h5>
        <h3>{exp.description}</h3>
        <h3>€ {exp.amount.toFixed(2)}</h3>
        </li>
        ))
        }
    </ul>
    </div>
  )
}

export default Overview