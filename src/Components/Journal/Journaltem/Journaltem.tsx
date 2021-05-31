import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import localStore from '../../../localStore/localStore'
import { deleteTransactionSuccess, incomeToBill, outcomeFromBill } from '../../../Redux/billReducer'
import { TransactionType } from '../../../Redux/chartReducer'
import { historyTransactionsSelector } from '../../../Redux/selectors/billSelectors'
import s from './Journaltem.module.css'

type TableItemPropsType = {
    id: number
    type: string
    sum: string
    category: string
    desc: string
    date: string
}

const TableItem: FC<TableItemPropsType> = ({ id, date, type, sum, category, desc }) => {

    const dispatch = useDispatch()

    const historyTransactions = useSelector(historyTransactionsSelector)

    const deleteTransaction = () => {
        
        localStore.set('history', historyTransactions.filter((history: TransactionType) => history.id !== id))
        dispatch(deleteTransactionSuccess(id))

        if(type === 'income'){
            dispatch(outcomeFromBill(sum))
        }else{
            dispatch(incomeToBill(sum))
        }

        M.toast({html: 'Запись успешно удалена!'})
    }

    return (
        <tr className={type === 'income' ? s.income : s.outcome}>
            <td>{date}</td>
            <td>{type === 'income' ? 'Доход' : 'Расход'}</td>
            <td>{sum + ' ₴'}</td>
            <td>{category}</td>
            <td>{desc}</td>
            <td>
                <button 
                    className={type === 'income' ? s.incomeBtn : s.outcomeBtn} 
                    onClick={deleteTransaction}
                >Удалить</button>
            </td>
        </tr>
    )
}

export default TableItem