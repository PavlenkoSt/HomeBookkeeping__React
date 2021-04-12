import Add from "./Add"
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import { setNewTransactionSuccess, incomeToBill, outcomeFromBill } from '../../Redux/billReducer'
import { setFilteredTransactions } from '../../Redux/chartReducer'
import localStore from '../../localStore/localStore';
import { useEffect } from 'react';
import M from 'materialize-css';
import getCurrentDate from '../../helpers/currentDate'


const AddContainer = ({ historyTransactions, setFilteredTransactions, reset , addModePlus, setNewTransactionSuccess, incomeToBill, outcomeFromBill }) => {
    const onSubmit = (formData) => {
        const transactionItem = {
            id: Date.now(),
            type: addModePlus ? 'income' : 'outcome',
            sum: formData.sum,
            category: addModePlus ? formData.from : formData.to,
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

const mapStateToProps = state => ({
    addModePlus: state.bill.addModePlus,
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { reset, setFilteredTransactions, setNewTransactionSuccess, incomeToBill, outcomeFromBill })(AddContainer)