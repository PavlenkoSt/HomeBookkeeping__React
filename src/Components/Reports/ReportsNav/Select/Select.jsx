import { useEffect } from "react"
import M from 'materialize-css'
import s from './Select.module.css'


const Select = ({ showTimeMode, changeShowTimeMode, setFilteredTransactions, allTransactions }) => {

    useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }, [])

    useEffect(() => {
        setFilteredTransactions(allTransactions)
    }, [showTimeMode])

    return (
        <div className={s.selectContainer}>   
            <select value={showTimeMode} onChange={(e) => {
                changeShowTimeMode(e.target.value)
                setFilteredTransactions(allTransactions)
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