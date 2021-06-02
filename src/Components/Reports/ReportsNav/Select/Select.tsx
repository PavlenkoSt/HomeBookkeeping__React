import { useEffect } from "react"
import M from 'materialize-css'
import s from './Select.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { historyTransactionsSelector } from "../../../../Redux/selectors/billSelectors"
import { changeShowTimeMode, setFilteredTransactions } from "../../../../Redux/chartReducer"
import { showTimeModeSelector } from "../../../../Redux/selectors/chartSelectors"

const Select = () => {
    const dispatch = useDispatch()
    const allTransactions = useSelector(historyTransactionsSelector)
    const showTimeMode = useSelector(showTimeModeSelector)

    useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }, [])

    useEffect(() => {
        dispatch(setFilteredTransactions(allTransactions))
    }, [showTimeMode])

    return (
        <div className={s.selectContainer}>   
            <select value={showTimeMode} onChange={(e) => {
                dispatch(changeShowTimeMode(e.target.value))
                dispatch(setFilteredTransactions(allTransactions))
            }} >
                <option value="day">Сегодня</option>
                <option value="week">Последняя неделя</option>
                <option value="month">Последний месяц</option>
                <option value="year">Последний год</option>
            </select>
        </div>
    )
}

export default Select