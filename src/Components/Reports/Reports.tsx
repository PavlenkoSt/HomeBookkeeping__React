import s from './Reports.module.scss'
import ReportsNav from './ReportsNav/ReportsNav'
import ReportsInfo from './ReportsInfo/ReportsInfo'
import GeneralSum from './GeneralSum/GeneralSum'
import ChartContainer from './Chart/ChartContainer'

const Reports = () => {
    return (
        <div className={s.container}>
            <ReportsNav />
            <GeneralSum />
            <div className={s.main}>
                <ChartContainer />
                <ReportsInfo />
            </div>
        </div>
    )
}

export default Reports