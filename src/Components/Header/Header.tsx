import s from './Header.module.css'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeModalMode, PathType } from '../../Redux/headerReducer'
import React, { FC, useEffect } from 'react'
import { AppStateType } from '../../Redux/reduxStore'
import { compose } from 'redux'

type MapStatePropsType = {
    paths: Array<PathType>
    bill: number
}

type MapDispatchPropsType = {
    changeModalMode: (modalMode: boolean) => void
}

const Header: FC<MapStatePropsType & MapDispatchPropsType & RouteComponentProps> = ({paths, location, bill, changeModalMode}) => {
    const burger = React.createRef()

    const navs = paths.map(path => {
        const activeClass = location.pathname.match(path.to) ? s.active : ''
        return <NavLink key={path.id} className={ `${s.link} ${activeClass}` } to={path.to}>{path.text}</NavLink>
    })

    function toggleNav(){
        //@ts-ignore
        const $this = this
        $this.classList.toggle(s.active)
        $this.parentElement.childNodes[1].classList.toggle(s.show)
        $this.parentElement.classList.toggle(s.marginHeader)
    }

    useEffect(() => {
        const burgerBtn = burger.current
        // @ts-ignore
        burgerBtn.addEventListener('click', toggleNav)
    }, [])

    return (
        <header className={s.header}>
            {/* @ts-ignore */}
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

const mapStateToProps = (state: AppStateType) => ({
    paths: state.header.paths,
    bill: state.bill.bill,
})

export default compose(
    connect(mapStateToProps, { changeModalMode }),
    withRouter
)(Header)
