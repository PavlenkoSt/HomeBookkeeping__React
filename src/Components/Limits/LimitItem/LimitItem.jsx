import s from './LimitItem.module.css'

const LimitItem = ({ category, sum, deleteItem, progress, progressLineWidth, currentCategorySum, days }) => {

    return (
        <div className={s.item}>
            <div className={s.category}>{category}</div>
            <div className={s.days}>Дней осталось: {days}</div>
            <div title={progress <100 && days === 0 ? 'Лимит выполнен!' : progressLineWidth} className={s.progress}>
            { progress >= 100 && <div class={s.alert}>Лимит превышен!</div>}
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