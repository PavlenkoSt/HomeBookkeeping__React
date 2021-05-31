import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { changeAddMode } from '../../../Redux/billReducer'
import { changeRedirectPath, RedirectType } from '../../../Redux/headerReducer'
import { autoRedirectSelector, pathsSelector } from '../../../Redux/selectors/headerSelectors'
import s from './Item.module.css'

const Item: FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch()
    const paths = useSelector(pathsSelector)
    const autoRedirect = useSelector(autoRedirectSelector)

    const filteredLink = paths.filter(path => location.pathname.match(path.to))

    const subheaderLinks = filteredLink[0].childLinks.map(subpath => {
        const activeClass = location.pathname.match(subpath.to) ? s.active : ''
        const subheaderItemClick = () => {
            subpath.to === '/add/income' && dispatch(changeAddMode(true))
            subpath.to === '/add/outcome' && dispatch(changeAddMode(false))
            dispatch(changeRedirectPath(filteredLink[0].to, subpath.to))
        }
        return <NavLink 
            onClick={subheaderItemClick} 
            key={subpath.id} 
            className={`${s.link} ${activeClass}`} 
            to={subpath.to}>{subpath.text}</NavLink>
    })

    const isOpenPage = filteredLink[0].childLinks.filter(child => location.pathname.match(child.to))
    const redirectPath = autoRedirect.filter((pathObj: RedirectType) => pathObj.page === filteredLink[0].to )
    const redirect = redirectPath[0].redirect


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

export default withRouter(Item)