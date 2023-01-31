import React, { useContext } from 'react';
import { AllContextType } from '../types';
import { AllContext } from './context';
import Input from './input';

const Overview = () => {

  const { expenses, income } = useContext(AllContext) as AllContextType

  return (
    <div>
    <h2>Add Income/Expense</h2>
    <ul>
        <Input />
    </ul>
    <h2>Income</h2>
    <ul>
        {income.slice(-5).map((exp, index) => (
        <li key={index}>
        <h5>{exp.category}</h5>
        <h3>{exp.description}</h3>
        <h3>€ {exp.amount}</h3>
        </li>
        ))
        }
    </ul>
    <h2>Expenses</h2>
    <ul>
        {expenses.slice(-5).map((exp, index) => (
        <li key={index}>
        <h5>{exp.category}</h5>
        <h3>{exp.description}</h3>
        <h3>€ {exp.amount}</h3>
        </li>
        ))
        }
    </ul>
    </div>
  )
}

export default Overview