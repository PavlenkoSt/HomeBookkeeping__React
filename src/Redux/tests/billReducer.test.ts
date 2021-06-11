import billReducer, { 
    incomeToBill, outcomeFromBill, changeAddMode, setNewTransactionSuccess, deleteTransactionSuccess,
    synhronizedHistoryTransactionFromLocalStorage, synhronizedBillFromLocalStorage, changeBill, changeLoadStatus
} from '../billReducer'

const state = {
    bill: 2000,
    addModePlus: true,
    historyTransactions: [{
            category: 'some category',
            date: '20.02.20',
            desc: 'some desc',
            id: 21,
            sum: '1500',
            type: 'income'
        }
    ],
    load: false
}

describe('bill reducers', () => {
    it('bill should be income', () => {
        const action = incomeToBill('100')
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.bill).toBe(2100)
    })
    it('bill should be outcome', () => {
        const action = outcomeFromBill('100')
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.bill).toBe(1900)
    })
    it('addMode should be false', () => {
        const action = changeAddMode(false)
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.addModePlus).toBe(false)
    })
    it('historyTransaction length should be 1', () => {
        const action = setNewTransactionSuccess({
            category: 'some category',
            date: '20.02.20',
            desc: 'some desc',
            id: 22,
            sum: '150',
            type: 'income'
        })
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.historyTransactions.length).toBe(2)
    })
    it('historyTransaction length should be 0', () => {
        const action = deleteTransactionSuccess(21)
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.historyTransactions.length).toBe(0)
    })
    it('historyTransaction length should be 2', () => {
        const transactionsFromLS = [
            {
                category: 'some category',
                date: '20.02.20',
                desc: 'some desc',
                id: 2,
                sum: '1500',
                type: 'income'
            },
            {
                category: 'some category',
                date: '20.02.20',
                desc: 'some desc',
                id: 3,
                sum: '1500',
                type: 'income'
            }
        ]
        const action = synhronizedHistoryTransactionFromLocalStorage(transactionsFromLS)
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.historyTransactions.length).toBe(2)
    })
    it('bill should be 20000', () => {
        const action = synhronizedBillFromLocalStorage(20000)
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.bill).toBe(20000)
    })
    it('bill should be 1000', () => {
        const action = changeBill(1000)
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.bill).toBe(1000)
    })
    it('load should be true', () => {
        const action = changeLoadStatus(true)
        const modernizedStatePosts = billReducer(state, action)
        expect(modernizedStatePosts.load).toBe(true)
    })
})