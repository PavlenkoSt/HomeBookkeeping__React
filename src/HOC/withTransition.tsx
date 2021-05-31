import { ComponentType, FC } from 'react'
import { ConnectedComponent } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import './withTransition.css'

const withTransition = (Component: ConnectedComponent<ComponentType<any>, any> | FC) => {
    return ({match}: any) => {
        return (
            <CSSTransition in={match !== null} classNames='page' timeout={500} unmountOnExit >
                <Component/>
            </CSSTransition>
        )
    }
}


export default withTransition