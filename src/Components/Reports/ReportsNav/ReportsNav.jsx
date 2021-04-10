import Buttons from './Buttons/Buttons'
import Select from './Select/Select'
import s from './ReportsNav.module.css'


const ReportsNav = ({ showModeIncome, changeShowModeIncome, showTimeMode, changeShowTimeMode, setFilteredTransactions, allTransactions }) => {
    return (
        <div>
            <Buttons 
                showModeIncome={showModeIncome} 
                changeShowModeIncome={changeShowModeIncome}
                setFilteredTransactions={setFilteredTransactions} 
                allTransactions={allTransactions} />
            <Select 
                showTimeMode={showTimeMode} 
                changeShowTimeMode={changeShowTimeMode} 
                setFilteredTransactions={setFilteredTransactions} 
                allTransactions={allTransactions}/>
        </div>
    )
}

export default ReportsNav