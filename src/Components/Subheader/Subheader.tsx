import { FC } from "react"
import { Route } from "react-router"
import Item from "./Item/Item"

const Subheader: FC = () => {
    return (
        <div>
            <Route path='/add' component={Item} />
            <Route path='/statistics' component={Item} />
            <Route path='/budget' component={Item} />
        </div>
    )
}

export default Subheader