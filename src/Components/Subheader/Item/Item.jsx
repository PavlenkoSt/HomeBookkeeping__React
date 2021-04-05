import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import s from './Item.module.css'

const Add = ({ paths, location }) => {
    const filteredLink = paths.filter(path => location.pathname.match(path.to))

    const subheaderLinks = filteredLink[0].childLinks.map(subpath => {
        const activeClass = location.pathname.match(subpath.to) ? s.active : ''
        return <NavLink key={subpath.id} className={`${s.link} ${activeClass}`} to={subpath.to}>{subpath.text}</NavLink>
    })
        
    return (
        <div>
            <nav className={s.nav}>
                {subheaderLinks}
            </nav>
        </div>
    )
}

const mapStateToProps = state => ({
    paths: state.header.paths
})

export default connect(mapStateToProps)(Add)