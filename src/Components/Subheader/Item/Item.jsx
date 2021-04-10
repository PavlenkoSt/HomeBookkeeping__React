import { Redirect } from 'react-router'
import s from './Item.module.css'

const Item = ({isOpenPage , subheaderLinks, redirect}) => {
    return (
        <div>
            <div className={s.nav}>
                {subheaderLinks}
            </div>
            {
                !isOpenPage.length ? <Redirect to={redirect} /> : null
            }
        </div>
    )
}

export default Item