import s from './TableItem.module.css'

const TableItem = ({ date, type, sum, category, desc, deleteTransaction }) => {
    return (
        <tr className={type === 'income' ? s.income : s.outcome}>
            <td>{date}</td>
            <td>{type === 'income' ? 'Доход' : 'Расход'}</td>
            <td>{sum + ' ₴'}</td>
            <td>{category}</td>
            <td>{desc}</td>
            <td>
                <button 
                    className={type === 'income' ? s.incomeBtn : s.outcomeBtn} 
                    onClick={deleteTransaction}
                >Удалить</button>
            </td>
        </tr>
    )
}

export default TableItem