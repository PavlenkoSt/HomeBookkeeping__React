import { useEffect } from 'react'
import s from './Buttons.module.css'

const Buttons = ({ changeShowModeIncome, showModeIncome, setFilteredTransactions, allTransactions }) => {
    
    useEffect(() => {
        setFilteredTransactions(allTransactions)
    }, [showModeIncome])

    return (
        <div className={s.btns}>
            <span 
                onClick={() => changeShowModeIncome(true)} 
                className={s.btn + ' ' + s.plus + ' ' + (showModeIncome ? s.active : '')}>Доходы</span>
            <span 
                onClick={() => changeShowModeIncome(false)} 
                className={s.btn + ' ' + s.minus + ' ' + (!showModeIncome ? s.active : '')}>Расходы</span>
        </div>
    )
}


export default Buttons