import { FC } from "react"

type ReportsInfoItemPropsType = {
    date: string
    sum: string
    desc: string
}

const ReportsInfoItem: FC<ReportsInfoItemPropsType> = ({ date, sum, desc}) => {
    return (
        <tr>
            <td>{date}</td>
            <td>{sum + ' ₴'}</td>
            <td>{desc}</td>
        </tr>
    )
}

export default ReportsInfoItem