import s from './Limits.module.css'
import AddLimitForm from "./AddLimitForm/AddLimitForm"

const Limits = ({ limitItems, onSubmit }) => {
    return (
        <div className={s.container}>
            {limitItems.length ? limitItems : <div className={s.noLimits}>Лимитов пока нет. Добавьте первый.</div>}
            <AddLimitForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Limits
