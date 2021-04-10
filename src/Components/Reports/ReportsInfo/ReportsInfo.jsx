import s from './ReportsInfo.module.css'
import ReportsInfoItem from './ReportsInfoItem/ReportsInfoItem'

const ReportsInfo = ({ filteredTransactions, activeCategory }) => {
    const list = filteredTransactions
        .filter(transaction => transaction.category === activeCategory)
        .map(transaction => <ReportsInfoItem key={transaction.id} date={transaction.date} sum={transaction.sum} desc={transaction.desc} /> )
    if(!list.length){
        return <></>
    }
    return (
        <table className={s.table}>
            <thead>
                <tr>
                    <td>Дата</td>
                    <td>Сумма</td>
                    <td>Описание</td>
                </tr>
            </thead> 
            <tbody>
                {list}
            </tbody>
        </table>
    )
}   


export default ReportsInfo