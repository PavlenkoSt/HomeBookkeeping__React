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
            <select onChange={(e) => {
                changeShowTimeMode(e.target.value)
                setFilteredTransactions(allTransactions)
            }} >
                <option value="day" selected={showTimeMode === 'day'} >Сегодня</option>
                <option value="week" selected={showTimeMode === 'week'}>Последняя неделя</option>
                <option value="month" selected={showTimeMode === 'month'}>Последний месяц</option>
                <option value="year" selected={showTimeMode === 'year'}>Последний год</option>
            </select>
        </div>
    )
}

export default Select