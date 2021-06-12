import chartReducer, { 
    changeShowModeIncome, changeShowTimeMode, setFilteredTransactions, setActiveCategory, changeGeneralSum
} from "../chartReducer"

const state = {
    showModeIncome: true,
    showTimeMode: 'year',
    filteredItems: [],
    activeCategory: '',
    generalSum: 0
}

describe('chart reducers', () => {
    it('showModeIncome should be false', () => {
        const action = changeShowModeIncome(false)
        const modernizedStatePosts = chartReducer(state, action)
        expect(modernizedStatePosts.showModeIncome).toBe(false)
    })
    it('showTimeMode should be - week', () => {
        const action = changeShowTimeMode('week')
        const modernizedStatePosts = chartReducer(state, action)
        expect(modernizedStatePosts.showTimeMode).toBe('week')
    })
    it('filteredTransaction length should be 1', () => {
        const filteredTransaction = {
            id: 1,
            type: 'income',
            sum: '2000',
            category: 'some category',
            desc: 'some desc',
            date: '10.10.2021'
        }
        const action = setFilteredTransactions([filteredTransaction])
        const modernizedStatePosts = chartReducer(state, action)
        expect(modernizedStatePosts.filteredItems.length).toBe(1)
    })
    it('activeCategory should be - HOME', () => {
        const action = setActiveCategory('HOME')
        const modernizedStatePosts = chartReducer(state, action)
        expect(modernizedStatePosts.activeCategory).toBe('HOME')
    })
    it('generalSum should be - 200', () => {
        const action = changeGeneralSum('200')
        const modernizedStatePosts = chartReducer(state, action)
        expect(modernizedStatePosts.generalSum).toBe('200')
    })
})