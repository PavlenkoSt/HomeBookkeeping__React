import TableItem from "./TableItem"
import M from 'materialize-css'
import localStore from '../../../../localStore/localStore'

const TableItemContainer = ({ date, type, sum, category, desc, id, deleteTransactionSuccess, incomeToBill, outcomeFromBill, historyTransactions }) => {

    const deleteTransaction = () => {
        localStore.set('history', historyTransactions.filter(history => history.id !== id))
        deleteTransactionSuccess(id)
        if(type === 'income'){
            outcomeFromBill(sum)
        }else{
            incomeToBill(sum)
        }
        M.toast({html: 'Запись успешно удалена!'})
    }
    return <TableItem date={date} type={type} sum={sum} category={category} desc={desc} deleteTransaction={deleteTransaction} />
}

export default TableItemContainer