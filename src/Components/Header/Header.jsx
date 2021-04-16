import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeModalMode } from '../../Redux/headerReducer'
import React, { useEffect } from 'react'

const Header = ({paths, location, bill, changeModalMode}) => {
    const burger = React.createRef()

    const navs = paths.map(path => {
        const activeClass = location.pathname.match(path.to) ? s.active : ''
        return <NavLink key={path.id} className={ `${s.link} ${activeClass}` } to={path.to}>{path.text}</NavLink>
    })

    function toggleNav(){
        this.classList.toggle(s.active)
        this.parentElement.childNodes[1].classList.toggle(s.show)
        this.parentElement.classList.toggle(s.marginHeader)
    }

    useEffect(() => {
        const burgerBtn = burger.current
        burgerBtn.addEventListener('click', toggleNav)
    }, [])

    return (
        <header className={s.header}>
            <div ref={burger} className={s.burger}>
                <div className={s.line}></div>
            </div>
            <div className={s.nav}>
                {navs}
            </div>
            <div className={s.bill} onClick={() => {changeModalMode(true)}}>
                Текущий баланс:
                <div className={s.cur}>{bill + ' ₴'}</div>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    paths: state.header.paths,
    bill: state.bill.bill,
})

export default connect(mapStateToProps, { changeModalMode })(Header)