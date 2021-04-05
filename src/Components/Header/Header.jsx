import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({paths, location}) => {
    const navs = paths.map(path => {
        const activeClass = location.pathname.match(path.to) ? s.active : ''
        return <NavLink key={path.id} className={ `${s.link} ${activeClass}` } to={path.to}>{path.text}</NavLink>
    })

    return (
        <header className={s.header}>
            <nav className={s.nav}>
                {navs}
            </nav>
            <div className={s.bill}>
                Текущий баланс:
                <div className={s.cur}>0</div>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    paths: state.header.paths
})

export default connect(mapStateToProps)(Header)