import React, { useContext, useState } from 'react'
import { AllContextType } from '../types'
import { AllContext } from './context'

const Expenses = () => {

  const { expenses } = useContext(AllContext) as AllContextType

  const [ edit, setEdit ] = useState<boolean>(false)

  const changeEdit = () => {
    setEdit(true);
    };

  return (
    <ul>
        {expenses.map((exp, index) => (
        <li key={index}>
        <>
        <h5>{exp.date}</h5>
        <h5>{exp.category}</h5>
        <h3>{exp.description}</h3>
        <h3>€ {exp.amount.toFixed(2)}</h3>
        <h3>VAT {exp.vat}%</h3>
        </>
        </li>
        ))
        }
    </ul>
  )
}

export default Expenses