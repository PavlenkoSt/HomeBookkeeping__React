import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeShowModeIncome, setFilteredTransactions } from '../../../../Redux/chartReducer'
import { historyTransactionsSelector } from '../../../../Redux/selectors/billSelectors'
import { showModeIncomeSelector } from '../../../../Redux/selectors/chartSelectors'
import s from './Buttons.module.css'

const Buttons = () => {
    const dispatch = useDispatch()
    const showModeIncome = useSelector(showModeIncomeSelector)
    const allTransactions = useSelector(historyTransactionsSelector)

    const showModeChange = (status: boolean) => {
        dispatch(changeShowModeIncome(status))
    }
    
    useEffect(() => {
        dispatch(setFilteredTransactions(allTransactions))
    }, [showModeIncome])

    return (
        <div className={s.btns}>
            <span 
                onClick={() => showModeChange(true)} 
                className={s.btn + ' ' + s.plus + ' ' + (showModeIncome ? s.active : '')}>Доходы</span>
            <span 
                onClick={() => showModeChange(false)} 
                className={s.btn + ' ' + s.minus + ' ' + (!showModeIncome ? s.active : '')}>Расходы</span>
        </div>
    )
}


export default Buttons