import Add from "./Add"
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import { setNewTransactionSuccess, incomeToBill, outcomeFromBill, changeAddMode } from '../../Redux/billReducer'
import { setFilteredTransactions, TransactionType } from '../../Redux/chartReducer'
import localStore from '../../localStore/localStore'
import { FC, useEffect } from 'react'
import M from 'materialize-css'
import getCurrentDate from '../../helpers/currentDate'
import { AppStateType } from "../../Redux/reduxStore"

type MapStatePropsType = {
    addModePlus: boolean
    historyTransactions: Array<TransactionType>
}

type MapDispatchPropsType = {
    reset: (formName: string) => void
    setFilteredTransactions: (allTransactions: Array<TransactionType>) => void
    setNewTransactionSuccess: (transactionItem: TransactionType) => void
    incomeToBill: (sum: string) => void
    outcomeFromBill: (sum: string) => void
    changeAddMode: (addMode: boolean) => void
}

type FormDataType = {
    sum: string
    category: string
    desc: string
}

const AddContainer: FC<MapStatePropsType & MapDispatchPropsType> = ({ historyTransactions, setFilteredTransactions, reset , addModePlus, setNewTransactionSuccess, incomeToBill, outcomeFromBill, changeAddMode }) => {
    const onSubmit = (formData: FormDataType) => {
        if(!formData.sum || !formData.category){
            M.toast({html: 'Ошибка! Вы не можете сохранить пустую транзакцию!'})
            return false
        }else{
            const transactionItem = {
                id: Date.now(),
                type: addModePlus ? 'income' : 'outcome',
                sum: formData.sum,
                category: formData.category,
                desc: formData.desc,
                date: getCurrentDate()
            }
            setNewTransactionSuccess(transactionItem)
            
            if(transactionItem.type === 'income'){
                incomeToBill(transactionItem.sum)
            }else{
                outcomeFromBill(transactionItem.sum)
            }
    
            reset('add-transaction')
            M.toast({html: 'Запись успешно добавлена!'})
        }
    }

    useEffect(() => {
        if(historyTransactions.length){
            localStore.set('history', historyTransactions)
        }
    }, [historyTransactions])

    useEffect(() => {
        setFilteredTransactions(historyTransactions)
    }, [historyTransactions])

    return <Add getCurrentDate={getCurrentDate} onSubmit={onSubmit} />
}

const mapStateToProps = (state: AppStateType) => ({
    addModePlus: state.bill.addModePlus,
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { reset, setFilteredTransactions, setNewTransactionSuccess, incomeToBill, outcomeFromBill, changeAddMode })(AddContainer)