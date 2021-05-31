import { AppStateType } from './../reduxStore'

export const billSelector = (state: AppStateType) => state.bill.bill
export const addModePlusSelector = (state: AppStateType) => state.bill.addModePlus
export const historyTransactionsSelector = (state: AppStateType) => state.bill.historyTransactions
export const loadSelector = (state: AppStateType) => state.bill.load