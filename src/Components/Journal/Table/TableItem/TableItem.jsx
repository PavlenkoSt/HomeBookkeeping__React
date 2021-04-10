import s from './TableItem.module.css'
import M from 'materialize-css'
import localStore from '../../../../localStore/localStore'

const TableItem = ({ date, type, sum, category, desc, id, deleteTransactionSuccess, incomeToBill, outcomeFromBill, historyTransactions }) => {
    const deleteTransaction = () => {
        localStore.history.set(historyTransactions.filter(history => history.id !== id))
        deleteTransactionSuccess(id)
        if(type === 'income'){
            outcomeFromBill(sum)
        }else{
            incomeToBill(sum)
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