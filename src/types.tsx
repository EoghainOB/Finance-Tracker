import { Dispatch, SetStateAction } from "react"

export interface userTypes {
    email: string
    familyName: string
    givenName: string
    googleId: string
    imageUrl: string
    name: string
}

export interface incomeTypes {
    _id: number,
    category: string,
    description: string,
    amount: number,
    vat: number, 
}

export interface expenseTypes {
    _id: number,
    category: string,
    description: string,
    amount: number,
    vat: number,
}

export type AllContextType = {
    // profile: userTypes
    income: incomeTypes[]
    expenses: expenseTypes[]
    // setProfile: Dispatch<SetStateAction<userTypes>>
}
