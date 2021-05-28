import dateValid from '../helpers/dateValid'

export type TransactionType = {
    id: number,
    type: string,
    sum: string,
    category: string,
    desc: string,
    date: Date
}

const CHANGE_SHOW_MODE_INCOME = 'CHANGE_SHOW_MODE_INCOME'
const CHANGE_SHOW_TIME_MODE = 'CHANGE_SHOW_TIME_MODE'
const SET_FILTERED_TRANSACTIONS = 'SET_FILTERED_TRANSACTIONS'
const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'
const CHANGE_GENERAL_SUM = 'CHANGE_GENERAL_SUM'

export const changeShowModeIncome = (mode: boolean) => ({ type: CHANGE_SHOW_MODE_INCOME, mode })
export const changeShowTimeMode = (mode: string) => ({ type: CHANGE_SHOW_TIME_MODE, mode })
export const setFilteredTransactions = (allTransactions: Array<TransactionType>) => ({ type: SET_FILTERED_TRANSACTIONS, allTransactions })
export const setActiveCategory = (category: string) => ({ type: SET_ACTIVE_CATEGORY, category })
export const changeGeneralSum = (sum: string) => ({ type: CHANGE_GENERAL_SUM, sum })

const initialValue = {
    showModeIncome: true,
    showTimeMode: 'day',
    filteredItems: [],
    activeCategory: '',
    generalSum: 0
}

const crartReducer = (state = initialValue, action: any) => {
    switch(action.type){
        case CHANGE_SHOW_MODE_INCOME: {
            return {
                ...state,
                showModeIncome: action.mode
            }
        }
        case CHANGE_SHOW_TIME_MODE: {
            return {
                ...state,
                showTimeMode: action.mode
            }
        }
        case SET_FILTERED_TRANSACTIONS: {
            const filteredItems = action.allTransactions.filter((transaction: TransactionType) => {
                if(transaction.type === (state.showModeIncome ? 'income' : 'outcome')){
                    return dateValid(state.showTimeMode, transaction.date)
                }
                return false
            })
            return {
                ...state,
                filteredItems: filteredItems
            }
        }
        case SET_ACTIVE_CATEGORY: {
            return {
                ...state,
                activeCategory: action.category
            }
        }
        case CHANGE_GENERAL_SUM: {
            return {
                ...state,
                generalSum: action.sum
            }
        }
        default: 
            return state
    }
}

export default crartReducer

