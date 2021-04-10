


const ReportsInfoItem = ({ date, sum, desc}) => {
    return (
        <tr>
            <td>{date}</td>
            <td>{sum + ' ₴'}</td>
            <td>{desc}</td>
        </tr>
    )
}

export default ReportsInfoItem