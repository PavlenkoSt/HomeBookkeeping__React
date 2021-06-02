import { useSelector } from 'react-redux'
import { TransactionType } from '../../../Redux/chartReducer'
import { activeCategorySelector, filteredItemsSelector } from '../../../Redux/selectors/chartSelectors'
import s from './ReportsInfo.module.scss'
import ReportsInfoItem from './ReportsInfoItem/ReportsInfoItem'

const ReportsInfo = ({  }) => {
    const filteredTransactions = useSelector(filteredItemsSelector)
    const activeCategory = useSelector(activeCategorySelector)

    const list = filteredTransactions
        .filter((transaction: TransactionType) => transaction.category === activeCategory)
        .map((transaction: TransactionType) => <ReportsInfoItem 
            key={transaction.id} 
            date={transaction.date} 
            sum={transaction.sum} 
            desc={transaction.desc} 
        /> )
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