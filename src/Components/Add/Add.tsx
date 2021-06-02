import { FC, useEffect } from 'react'
import getCurrentDate from '../../helpers/currentDate'
import s from './Add.module.scss'
import AddForm from './AddForm/AddForm'
import { useDispatch, useSelector } from 'react-redux'
import { addModePlusSelector, historyTransactionsSelector } from '../../Redux/selectors/billSelectors'
import { incomeToBill, outcomeFromBill, setNewTransactionSuccess } from '../../Redux/billReducer'
import { reset } from 'redux-form'
import localStore from '../../localStore/localStore'
import { setFilteredTransactions } from '../../Redux/chartReducer'

export type FormDataType = {
    sum: string
    category: string
    desc: string
}

const Add: FC = () => {
    const dispatch = useDispatch()

    const addModePlus = useSelector(addModePlusSelector)
    const historyTransactions = useSelector(historyTransactionsSelector)

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

            dispatch(setNewTransactionSuccess(transactionItem))
            
            if(transactionItem.type === 'income'){
                dispatch(incomeToBill(transactionItem.sum))
            }else{
                dispatch(outcomeFromBill(transactionItem.sum))
            }
    
            dispatch(reset('add-transaction'))
            M.toast({html: 'Запись успешно добавлена!'})
        }
    }

    useEffect(() => {
        if(historyTransactions.length){
            localStore.set('history', historyTransactions)
        }
    }, [historyTransactions])

    useEffect(() => {
        dispatch(setFilteredTransactions(historyTransactions))
    }, [historyTransactions])

    return ( 
        <div className={s.container}>
            {/* @ts-ignore */}
            <AddForm onSubmit={onSubmit}/>
            <div className={s.date}>{getCurrentDate()}</div>
        </div>
    )
}

export default Add