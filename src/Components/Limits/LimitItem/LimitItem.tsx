import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import localStore from '../../../localStore/localStore'
import { deleteLimit, LimitType } from '../../../Redux/budgetReducer'
import { TransactionType } from '../../../Redux/chartReducer'
import { historyTransactionsSelector } from '../../../Redux/selectors/billSelectors'
import { limitsSelector } from '../../../Redux/selectors/budgetSelectors'
import s from './LimitItem.module.scss'

type LimitItemPropsType = {
    id: number
    category: string
    sum: string
    deadline: Array<number>
}

const LimitItem: FC<LimitItemPropsType> = ({ id, category, sum, deadline }) => {
    const dispatch = useDispatch()
    const limits = useSelector(limitsSelector)
    const historyTransactions = useSelector(historyTransactionsSelector)

    const deleteItem = () => {
        dispatch(deleteLimit(id))
        localStore.set('limits', limits.filter((limit: LimitType) => limit.id !== id))
        M.toast({html: 'Лимит успешно удален!'})
    }

    const targetTransaction: Array<TransactionType> = historyTransactions.filter((transaction: TransactionType) => {
        const date = transaction.date.split('.').reverse()
        date[1] = (+date[1] - 1).toString()
        const transactionDate = new Date(date.join())
        //@ts-ignore
        return transaction.type === 'outcome' && transaction.category === category && transactionDate < new Date(...deadline)
    })
    


    let currentCategorySum: number
    if(targetTransaction.length){
        currentCategorySum = targetTransaction.reduce((acc,cur) => {
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

    return (
        <div className={s.item}>
            <div className={s.category}>{category}</div>
            <div className={s.days}>Дней осталось: {days}</div>
            <div title={progress <100 && days === 0 ? 'Лимит выполнен!' : progressLineWidth} className={s.progress}>
            { progress >= 100 && <div className={s.alert}>Лимит превышен!</div>}
            { progress <100 && days === 0 && <div className={s.alert}>Лимит выполнен!</div> }
                <div className={s.line}>
                    <div className={`${s.subline} ${progress > 50 ? s.orange : ''} ${progress > 85 ? s.red : ''}` } style={{width: progressLineWidth}}></div>
                </div>
            </div>
            <div className={s.limit}>{currentCategorySum} / {sum}</div>
            <button onClick={deleteItem} className={s.removeBtn} >Удалить</button>
        </div>
    )
}

export default LimitItem