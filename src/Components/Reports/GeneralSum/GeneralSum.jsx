import { useEffect } from 'react'
import s from './GeneralSum.module.css'

const GeneralSum = ({ generalSum, showModeIncome, filteredTransactions, changeGeneralSum }) => {
    const bgColorClass = (showModeIncome && s.plus) || (!showModeIncome && s.minus)
    useEffect(() => {
       const generalSum = filteredTransactions.reduce((cur, acc) => {
           return cur += +acc.sum
       }, 0)
       changeGeneralSum(generalSum)
    }, [filteredTransactions])
    return (
        <div className={`${s.general} ${bgColorClass}`}>Общая сумма: <span className={s.sum}>{generalSum + ' ₴'}</span></div>
    )
}

export default GeneralSum