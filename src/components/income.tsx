import React, { useContext } from 'react'
import { AllContextType } from '../types'
import { AllContext } from './context'

const Income = () => {

  const { income } = useContext(AllContext) as AllContextType

  return (
    <ul>
        {income.map((exp, index) => (
        <li key={index}>
        <h5>{exp.category}</h5>
        <h3>{exp.description}</h3>
        <h3>€ {exp.amount}</h3>
        <h3>VAT {exp.vat}%</h3>
        </li>
        ))
        }
    </ul>
  )
}

export default Income