import s from './Header.module.css'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { changeModalMode } from '../../Redux/headerReducer'
import React, { FC, useEffect } from 'react'
import { billSelector } from '../../Redux/selectors/billSelectors'
import { pathsSelector } from '../../Redux/selectors/headerSelectors'
 
const Header: FC<RouteComponentProps> = ({ location }) => {
    const burger = React.createRef()

    const dispatch = useDispatch()
    
    const bill = useSelector(billSelector)
    const paths = useSelector(pathsSelector)

    const openModal = () => {
        dispatch(changeModalMode(true))
    }

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
            <div className={s.bill} onClick={() => openModal()}>
                Текущий баланс:
                <div className={s.cur}>{bill + ' ₴'}</div>
            </div>
        </header>
    )
}


export default withRouter(Header)
