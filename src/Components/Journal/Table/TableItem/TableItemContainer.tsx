import TableItem from "./TableItem"
import M from 'materialize-css'
import localStore from '../../../../localStore/localStore'
import { TransactionType } from "../../../../Redux/chartReducer"
import { FC } from "react"

type TableItemContainerPropsType = {
    id: number
    type: string
    sum: string
    category: string
    desc: string
    date: string
    historyTransactions: Array<TransactionType>
    incomeToBill: (sum: string) => void
    outcomeFromBill: (sum: string) => void
    deleteTransactionSuccess: (id: number) => void
}

const TableItemContainer: FC<TableItemContainerPropsType> = ({ date, type, sum, category, desc, id, deleteTransactionSuccess, incomeToBill, outcomeFromBill, historyTransactions }) => {

    const deleteTransaction = () => {
        localStore.set('history', historyTransactions.filter((history: TransactionType) => history.id !== id))
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