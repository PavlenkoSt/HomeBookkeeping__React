import LimitItem from "./LimitItem"
import M from 'materialize-css'
import localStore from '../../../localStore/localStore'
import { FC } from "react"
import { LimitType } from "../../../Redux/budgetReducer"
import { TransactionType } from "../../../Redux/chartReducer"

type LimitItemContainerPropsType = {
    id: number
    category: string
    sum: string
    historyTransactions: Array<TransactionType>
    limits: Array<LimitType>
    deadline: Array<number>
    deleteLimit: (id: number) => void
}

const LimitItemContainer: FC<LimitItemContainerPropsType> = ({ id, category, sum, deleteLimit, limits, deadline, historyTransactions }) => {

    const deleteItem = () => {
        deleteLimit(id)
        localStore.set('limits', limits.filter(limit => limit.id !== id))
        M.toast({html: 'Лимит успешно удален!'})
    }

    let currentCategorySum: Array<TransactionType> | number = historyTransactions.filter(transaction => {
        const date = transaction.date.split('.').reverse()
        date[1] = (+date[1] - 1).toString()
        const transactionDate = new Date(date.join())
        return transaction.type === 'outcome' && transaction.category === category && transactionDate < new Date(deadline.join())
    })
    if(currentCategorySum.length){
        currentCategorySum = currentCategorySum.reduce((acc,cur) => {
            return acc += +cur.sum
        }, 0)
    }else{
        currentCategorySum = 0
    }

    const curDate = [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() 
    ]
    const currentDate = new Date(curDate[0], curDate[1], curDate[2])
    const endDate = new Date(deadline[0], deadline[1], deadline[2])

    //@ts-ignore
    let days = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))

    if(days <= 0){
        days = 0
    }

    const progress = Math.round((currentCategorySum * 100) / +sum)
    const progressLineWidth = progress > 100 ? '100%' : progress + '%'

    return <LimitItem 
        category={category} 
        sum={sum} 
        deleteItem={deleteItem} 
        progress={progress}
        progressLineWidth={progressLineWidth} 
        currentCategorySum={currentCategorySum}
        days={days}
    />
}

export default LimitItemContainer