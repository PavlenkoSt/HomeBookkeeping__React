import { connect } from 'react-redux'
import s from './Reports.module.css'
import ReportsNav from './ReportsNav/ReportsNav'
import { changeShowModeIncome, changeShowTimeMode, setFilteredTransactions, setActiveCategory, changeGeneralSum } from '../../Redux/chartReducer'
import ReportsInfo from './ReportsInfo/ReportsInfo'
import GeneralSum from './GeneralSum/GeneralSum'
import ChartContainer from './Chart/ChartContainer'

const Reports = ({ showModeIncome, changeShowModeIncome, showTimeMode, changeShowTimeMode, setFilteredTransactions, allTransactions, filteredTransactions, setActiveCategory, activeCategory, generalSum, changeGeneralSum }) => {
    return (
        <div className={s.container}>
            <ReportsNav
                showModeIncome={showModeIncome} 
                changeShowModeIncome={changeShowModeIncome}
                showTimeMode={showTimeMode}
                changeShowTimeMode={changeShowTimeMode}
                setFilteredTransactions={setFilteredTransactions}
                allTransactions={allTransactions}
                />
            <GeneralSum 
                generalSum={generalSum} 
                showModeIncome={showModeIncome} 
                filteredTransactions={filteredTransactions} 
                changeGeneralSum={changeGeneralSum}
                />
            <div className={s.main}>
                <ChartContainer />
                <ReportsInfo 
                    filteredTransactions={filteredTransactions} 
                    activeCategory={activeCategory}
                    />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    showModeIncome: state.chart.showModeIncome,
    showTimeMode: state.chart.showTimeMode,
    allTransactions: state.bill.historyTransactions,
    filteredTransactions: state.chart.filteredItems,
    activeCategory: state.chart.activeCategory,
    generalSum: state.chart.generalSum
})

export default connect( mapStateToProps, { changeShowModeIncome, changeShowTimeMode, setFilteredTransactions, setActiveCategory, changeGeneralSum } )(Reports)