import s from './Table.module.css'
import TableItemContainer from './TableItem/TableItemContainer'

const Table = ({ historyTransactions, deleteTransactionSuccess, incomeToBill, outcomeFromBill }) => {
    const tableItems = historyTransactions.map(transaction => <TableItemContainer 
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