import s from './PlanItem.module.css'


const PlanItem = ({ id, name, bill, completed, sum, changeCompletedStatus, progressBar, removeItem }) => {
    return (
        <div className={s.item}>
            <label>
                <input onChange={() => changeCompletedStatus(id, !completed)} type="checkbox" checked={completed}  />
                <span className={s.name}>{name}</span>
            </label>
            <div title={progressBar} className={s.progress}>
                <div className={s.line}>
                    <div className={s.subline} style={{width: completed ? '100%' : progressBar}}></div>
                </div>
            </div>
            <div className={s.bill}>{completed ? `${sum}₴` : `${bill} / ${sum}`}</div>
            <button onClick={removeItem} className={s.removeBtn}>Удалить</button>
        </div>
    )
}

export default PlanItem