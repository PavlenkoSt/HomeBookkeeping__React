import s from './Limits.module.css'
import AddLimitForm from "./AddLimitForm/AddLimitForm"
import { FC } from 'react'
import { FormSubmitHandler, SubmitHandler } from 'redux-form'

type LimitsPropsType = {
    limitItems: Array<JSX.Element>
    onSubmit: SubmitHandler<{}, {}, string> | FormSubmitHandler<{}, {}, string> | undefined
}

const Limits: FC<LimitsPropsType> = ({ limitItems, onSubmit }) => {
    return (
        <div className={s.container}>
            {limitItems.length ? limitItems : <div className={s.noLimits}>Лимитов пока нет. Добавьте первый.</div>}
            <AddLimitForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Limits
