import s from './Table.module.css'
import TableItem from "./TableItem/TableItem"



const Table = ({ historyTransactions, deleteTransactionSuccess, incomeToBill, outcomeFromBill }) => {
    const tableItems = historyTransactions.map(transaction => <TableItem 
        key={transaction.id}
        date={transaction.date} 
        type={transaction.type} 
        sum={transaction.sum}
        category={transaction.category}
        desc={transaction.desc}
        id={transaction.id}
        deleteTransactionSuccess={deleteTransactionSuccess}
        historyTransactions={historyTransactions}
        incomeToBill={incomeToBill}
        outcomeFromBill={outcomeFromBill}
        />)

    return (
        <table className={s.table}>
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
    )
}

export default Table