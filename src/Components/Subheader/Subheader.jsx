import { Route } from "react-router"
import ItemContainer from "./Item/ItemContainer"

const Subheader = () => {
    return (
        <div>
            <Route path='/add' component={ItemContainer} />
            <Route path='/statistics' component={ItemContainer} />
            <Route path='/budget' component={ItemContainer} />
        </div>
    )
}

export default Subheader