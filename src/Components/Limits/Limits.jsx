import s from './Limits.module.css'
import AddLimitForm from "./AddLimitForm/AddLimitForm"

const Limits = ({ limitItems, onSubmit }) => {
    return (
        <div className={s.container}>
            {limitItems ? limitItems : <div>Лимитов пока нет. Добавьте первый.</div>}
            <AddLimitForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Limits
