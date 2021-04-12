import s from './Add.module.css'
import AddForm from './AddForm/AddForm'


const Add = ({ getCurrentDate, onSubmit}) => {
    return (
        <div className={s.container}>
            <AddForm onSubmit={onSubmit}/>
            <div className={s.date}>{getCurrentDate()}</div>
        </div>
    )
}

export default Add