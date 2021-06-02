import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeGeneralSum, TransactionType } from '../../../Redux/chartReducer'
import { filteredItemsSelector, generalSumSelector, showModeIncomeSelector } from '../../../Redux/selectors/chartSelectors'
import s from './GeneralSum.module.scss'

const GeneralSum = () => {
    const dispatch = useDispatch()
    const generalSum = useSelector(generalSumSelector)
    const showModeIncome = useSelector(showModeIncomeSelector)
    const filteredTransactions = useSelector(filteredItemsSelector)

    const bgColorClass = (showModeIncome && s.plus) || (!showModeIncome && s.minus)
    useEffect(() => {
       const generalSum = filteredTransactions.reduce((cur: number, acc: TransactionType) => {
           return cur += +acc.sum
       }, 0)
       dispatch(changeGeneralSum(generalSum))
    }, [filteredTransactions])
    return (
        <div className={`${s.general} ${bgColorClass}`}>Общая сумма: <span className={s.sum}>{generalSum + ' ₴'}</span></div>
    )
}

export default GeneralSum