import LimitItem from "./LimitItem"
import M from 'materialize-css'
import localStore from '../../../localStore/localStore'


const LimitItemContainer = ({ id, category, sum, deleteLimit, limits, deadline, historyTransactions }) => {

    const deleteItem = () => {
        deleteLimit(id)
        localStore.set('limits', limits.filter(limit => limit.id !== id))
        M.toast({html: 'Лимит успешно удален!'})
    }

    let currentCategorySum = historyTransactions.filter(transaction => {
        const date = transaction.date.split('.').reverse()
        date[1] = (+date[1] - 1).toString()
        const transactionDate = new Date(date.join())
        return transaction.type === 'outcome' && transaction.category === category && transactionDate < new Date(deadline.join())
    })
    if(currentCategorySum.length){
        currentCategorySum = currentCategorySum.reduce((acc,cur) => {
            return acc += +cur.sum
        }, 0)
    }else{
        currentCategorySum = 0
    }

    const curDate = [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() 
    ]
    const currentDate = new Date(curDate[0], curDate[1], curDate[2])
    const endDate = new Date(deadline[0], deadline[1], deadline[2])

    let days = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))

    if(days <= 0){
        days = 0
    }

    const progress = Math.round((currentCategorySum * 100) / sum)
    const progressLineWidth = progress > 100 ? '100%' : progress + '%'

    return <LimitItem 
        category={category} 
        sum={sum} 
        deleteItem={deleteItem} 
        progress={progress}
        progressLineWidth={progressLineWidth} 
        currentCategorySum={currentCategorySum}
        days={days}
    />
}

export default LimitItemContainer