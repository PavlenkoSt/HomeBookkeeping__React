import { FC } from 'react'
import { TransactionType } from '../../../Redux/chartReducer'
import s from './LimitItem.module.css'

type LimitItemPropsType = {
    currentCategorySum: Array<TransactionType> | number
    category: string
    sum: string
    progress: number
    progressLineWidth: string
    days: number
    deleteItem: () => void
}

const LimitItem: FC<LimitItemPropsType> = ({ category, sum, deleteItem, progress, progressLineWidth, currentCategorySum, days }) => {
    return (
        <div className={s.item}>
            <div className={s.category}>{category}</div>
            <div className={s.days}>Дней осталось: {days}</div>
            <div title={progress <100 && days === 0 ? 'Лимит выполнен!' : progressLineWidth} className={s.progress}>
            { progress >= 100 && <div className={s.alert}>Лимит превышен!</div>}
            { progress <100 && days === 0 && <div className={s.alert}>Лимит выполнен!</div> }
                <div className={s.line}>
                    <div className={`${s.subline} ${progress > 50 ? s.orange : ''} ${progress > 85 ? s.red : ''}` } style={{width: progressLineWidth}}></div>
                </div>
            </div>
            <div className={s.limit}>{currentCategorySum} / {sum}</div>
            <button onClick={deleteItem} className={s.removeBtn} >Удалить</button>
        </div>
    )
}

export default LimitItem