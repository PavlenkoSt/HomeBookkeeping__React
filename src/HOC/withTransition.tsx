import { CSSTransition } from 'react-transition-group'
import './withTransition.css'

const withTransition = (Component: React.ComponentClass) => {
    return ({match}: any) => {
        return (
            <CSSTransition in={match !== null} classNames='page' timeout={500} unmountOnExit >
                <Component/>
            </CSSTransition>
        )
    }
}


export default withTransition