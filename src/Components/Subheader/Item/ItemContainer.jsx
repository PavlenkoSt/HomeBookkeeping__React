import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import s from './Item.module.css'
import { changeRedirectPath } from '../../../Redux/headerReducer'
import { changeAddMode } from '../../../Redux/billReducer'
import Item from "./Item"

const ItemContainer = ({ paths, location, autoRedirect, changeRedirectPath, changeAddMode }) => {
    const filteredLink = paths.filter(path => location.pathname.match(path.to))

    const subheaderLinks = filteredLink[0].childLinks.map(subpath => {
        const activeClass = location.pathname.match(subpath.to) ? s.active : ''
        const subheaderItemClick = () => {
            subpath.to === '/add/income' && changeAddMode(true)
            subpath.to === '/add/outcome' && changeAddMode(false)
            changeRedirectPath(filteredLink[0].to, subpath.to )
        }
        return <NavLink 
            onClick={subheaderItemClick} 
            key={subpath.id} 
            className={`${s.link} ${activeClass}`} 
            to={subpath.to}>{subpath.text}</NavLink>
    })

    const isOpenPage = filteredLink[0].childLinks.filter(child => location.pathname.match(child.to))
    const redirectPath = autoRedirect.filter(pathObj => pathObj.page === filteredLink[0].to )

    return (
        <Item isOpenPage={isOpenPage} subheaderLinks={subheaderLinks} redirect={redirectPath[0].redirect} />
    )
}

const mapStateToProps = state => ({
    paths: state.header.paths,
    autoRedirect: state.header.autoRedirect
})

export default connect(mapStateToProps, { changeRedirectPath, changeAddMode })(ItemContainer)