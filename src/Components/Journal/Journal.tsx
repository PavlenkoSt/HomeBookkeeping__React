import s from './Journal.module.scss'
import { useSelector } from "react-redux"
import { FC } from 'react'
import { historyTransactionsSelector } from '../../Redux/selectors/billSelectors'
import Journaltem from './Journaltem/Journaltem'
import { TransactionType } from '../../Redux/chartReducer'

const Journal: FC = () => {

    const historyTransactions = useSelector(historyTransactionsSelector)

    if(!historyTransactions.length){
        return <div className={s.noRecords}>Записей пока нет.</div>
    }

    const tableItems = historyTransactions.map((transaction: TransactionType) => <Journaltem 
        key={transaction.id}
        date={transaction.date} 
        type={transaction.type} 
        sum={transaction.sum}
        category={transaction.category}
        desc={transaction.desc}
        id={transaction.id}
    />)

    return (
        <div>
            <table className={s.tableJournal}>
            <thead>
                <tr>
                    <td>Дата</td>
                    <td>Тип</td>
                    <td>Сумма</td>
                    <td>Категория</td>
                    <td>Описание</td>
                    <td>Удалить</td>
                </tr>
            </thead>
            <tbody>
                {tableItems.reverse()}
            </tbody>
        </table>
        </div>
    )
}

export default Journal