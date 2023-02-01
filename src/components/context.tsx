import React, { useEffect, useState, createContext } from 'react'
import { AllContextType, expenseTypes, incomeTypes } from '../types';
import App from '../App';

export const AllContext = createContext<AllContextType | null>(null)

const Context = ({ children }: any) => {

  const [income, setIncome] = useState<incomeTypes[]>([]);

  useEffect(() => {
    const incomeApi = async () => {
    const response = await fetch('http://localhost:8080/api/income')
    const data = await response.json()
    setIncome([...data])
    }
    incomeApi()
  }, [])

  const [expenses, setExpenses] = useState<expenseTypes[]>([]);

  useEffect(() => {
    const expenseApi = async () => {
    const response = await fetch('http://localhost:8080/api/expenses')
    const data = await response.json()
    setExpenses([...data])
    }
    expenseApi()
  }, [])

  const [expCategories] = useState<string[]>([
    'Meals & Entertainment', 'Equipment', 'Travel & Accommodation'
  ]);
 
  const [incomeCategories] = useState<string[]>(['Services', 'Product', 'Salary']);

  const [vatRates] = useState<number[]>([0, 19, 21]);

  return (
    <AllContext.Provider value={{ expenses, setExpenses, income, setIncome, expCategories, incomeCategories, vatRates }}>
        <App />
    </AllContext.Provider>
  )
}

export default Context
