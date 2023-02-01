import React, { useContext } from 'react';
import { AllContextType } from '../types';
import { AllContext } from './context';
import Expensedetails from './expensedetails';
import Incomedetails from './incomedetails';
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
        {income.slice(-5).map((inc, index) => (
        <div key={index}>
            <Incomedetails inc={inc}/>
        </div>
        ))
        }
    </ul>
    <h2>Expenses</h2>
    <ul>
        {expenses.slice(-5).map((exp, index) => (
        <div key={index}>
            <Expensedetails exp={exp}/>
        </div>
        ))
        }
    </ul>
    </div>
  )
}

export default Overview
