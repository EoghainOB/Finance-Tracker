import React, { useContext } from 'react'
import { AllContextType } from '../types'
import { AllContext } from './context'
import Incomedetails from './incomedetails'

const Income = () => {

  const { income } = useContext(AllContext) as AllContextType

  return (
    <div>
    <h2>Income</h2>
    <ul>
        {income.map((inc, index) => (
        <div key={index}>
            <Incomedetails inc={inc}/>
        </div>
        ))
        }
    </ul>
    </div>
  )
}

export default Income
