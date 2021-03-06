import { TransactionType } from './chartReducer'

const CHANGE_ADD_MODE = 'CHANGE_ADD_MODE'
const INCOME_TO_BILL = 'INCOME_TO_BILL'
const OUTCOM_FROM_BILL = 'OUTCOM_FROM_BILL'
const SET_NEW_TRANSACTION = 'SET_NEW_TRANSACTION'
const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
const SYNHRONIZED_HISTORY_TRANSACTION_FROM_LOCAL_STORAGE = 'SYNHRONIZED_HISTORY_TRANSACTION_FROM_LOCAL_STORAGE'
const SYNHRONIZED_BILL_FROM_LOCAL_STORAGE = 'SYNHRONIZED_BILL_FROM_LOCAL_STORAGE'
const CHANGE_BILL = 'CHANGE_BILL'
const CHANGE_LOAD_STATUS = 'CHANGE_LOAD_STATUS'

export const incomeToBill = (sum: string) => ({ type: INCOME_TO_BILL, sum })
export const outcomeFromBill = (sum: string) => ({ type: OUTCOM_FROM_BILL, sum })
export const changeAddMode = (addModePlus: boolean) => ({ type: CHANGE_ADD_MODE, addModePlus })
export const setNewTransactionSuccess = (transactionItem: TransactionType) => ({ type: SET_NEW_TRANSACTION, transactionItem })
export const deleteTransactionSuccess = (id: number) => ({ type: DELETE_TRANSACTION, id})
export const synhronizedHistoryTransactionFromLocalStorage = (history: Array<TransactionType>) => ({ type: SYNHRONIZED_HISTORY_TRANSACTION_FROM_LOCAL_STORAGE, history })
export const synhronizedBillFromLocalStorage = (bill: number) => ({ type: SYNHRONIZED_BILL_FROM_LOCAL_STORAGE, bill })
export const changeBill = (bill: number) => ({ type: CHANGE_BILL, bill })
export const changeLoadStatus = (load: boolean) => ({ type: CHANGE_LOAD_STATUS, load })

const initialValue = {
    bill: 0,
    addModePlus: true,
    historyTransactions: [] as Array<TransactionType>,
    load: false
}

const billReducer = (state = initialValue, action: any) => {
    switch(action.type){
        case CHANGE_ADD_MODE: {
            return {
                ...state, 
                addModePlus: action.addModePlus
            }
        }
        case SET_NEW_TRANSACTION: {
            return {
                ...state,
                historyTransactions: [...state.historyTransactions, action.transactionItem]
            }
        }
        case DELETE_TRANSACTION: {
            return {
                ...state,
                historyTransactions: state.historyTransactions.filter((transaction: TransactionType) => transaction.id !== action.id)
            }
        }
        case SYNHRONIZED_HISTORY_TRANSACTION_FROM_LOCAL_STORAGE: {
            return {
                ...state,
                historyTransactions: action.history
            }
        }
        case SYNHRONIZED_BILL_FROM_LOCAL_STORAGE: {
            return {
                ...state,
                bill: action.bill
            }
        }
        case INCOME_TO_BILL: {
            return {
                ...state,
                bill: +state.bill + +action.sum
            }
        }
        case OUTCOM_FROM_BILL: {
            return {
                ...state,
                bill: +state.bill - +action.sum
            }
        }
        case CHANGE_BILL: {
            return {
                ...state,
                bill: action.bill
            }
        }
        case CHANGE_LOAD_STATUS: {
            return {
                ...state,
                load: action.load
            }
        }
        default: 
            return state
    }
}

export default billReducer