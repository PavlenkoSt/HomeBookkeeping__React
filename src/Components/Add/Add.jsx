import s from './Add.module.css'
import AddForm from './AddForm/AddForm'
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import M from 'materialize-css';
import { setNewTransactionSuccess, incomeToBill, outcomeFromBill } from '../../Redux/billReducer'
import { setFilteredTransactions } from '../../Redux/chartReducer'
import localStore from '../../localStore/localStore';
import { useEffect } from 'react';


const Add = ({ reset , addModePlus, historyTransactions, setNewTransactionSuccess, incomeToBill, outcomeFromBill, setFilteredTransactions }) => {
    const addZero = num => {
        if(num <= 9){
            num = '0' + num
        }
        return num
    }
    const getCurrentDate = () => {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${addZero(day)}.${addZero(month)}.${year}`
    }

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
            localStore.history.set(historyTransactions)
        }
    }, [historyTransactions])

    useEffect(() => {
        setFilteredTransactions(historyTransactions)
    }, [historyTransactions])

    return (
        <div className={s.container}>
            <AddForm onSubmit={onSubmit}/>
            <div className={s.date}>{getCurrentDate()}</div>
        </div>
    )
}

const mapStateToProps = state => ({
    addModePlus: state.bill.addModePlus,
    historyTransactions: state.bill.historyTransactions
})

export default connect(mapStateToProps, { reset, setNewTransactionSuccess, incomeToBill, outcomeFromBill, setFilteredTransactions })(Add)