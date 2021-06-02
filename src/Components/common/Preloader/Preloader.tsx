import { FC } from 'react'
import { useSelector } from 'react-redux'
import { loadSelector } from '../../../Redux/selectors/billSelectors'
import './Preloader.scss'

const Preloader: FC = () => {
    const load = useSelector(loadSelector)

    if(load){
        return null
    }

    return (
        <div id="cube-loader">
            <div className="caption">
            <div className="cube-loader">
                <div className="cube loader-1"></div>
                <div className="cube loader-2"></div>
                <div className="cube loader-4"></div>
                <div className="cube loader-3"></div>
            </div>
            </div>
        </div>
    )
}

export default Preloader