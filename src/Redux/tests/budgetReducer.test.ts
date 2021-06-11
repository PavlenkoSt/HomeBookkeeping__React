import budgetReducer, { 
    changeCompletedStatus, deletePlan, addNewLimit, deleteLimit, addNewPlan, synhronizedPlansFromLocalStorage, synhronizedLimitsFromLocalStorage 
} from "../budgetReducer"

const state = {
    plans: [
        {
            id: 1,
            task: 'some task',
            sum: '2000',
            completed: false
        }
    ],
    limits: [
        {
            id: 1,
            category: 'some category',
            limit: '20000000',
            deadline: [2021, 11, 23]
        }
    ]
}

describe('budget reducers', () => {
    it('plans length should be 0', () => {
        const action = deletePlan(1)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.plans.length).toBe(0)
    })
    it('plans[0] should be completed', () => {
        const action = changeCompletedStatus(1, true)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.plans[0].completed).toBe(true)
    })
    it('plans length should be 2', () => {
        const newPlan = {
            id: 2,
            task: 'some task',
            sum: '1000',
            completed: false
        }
        const action = addNewPlan(newPlan)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.plans.length).toBe(2)
    })
    it('plans length should be 2', () => {
        const plansFromLS = [
            {
                id: 2,
                task: 'some task',
                sum: '1000',
                completed: false
            },
            {
                id: 3,
                task: 'some task',
                sum: '4500',
                completed: false
            },
            {
                id: 4,
                task: 'some task',
                sum: '1000000',
                completed: false
            }
        ]
        const action = synhronizedPlansFromLocalStorage(plansFromLS)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.plans.length).toBe(3)
    })
    it('limits length should be 0', () => {
        const action = deleteLimit(1)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.limits.length).toBe(0)
    })
    it('limits length should be 2', () => {
        const newLimit = {
            id: 2,
            category: 'some category',
            limit: '12300',
            deadline: [2021, 11, 23]
        }
        const action = addNewLimit(newLimit)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.limits.length).toBe(2)
    })
    it('limits length should be 3', () => {
        const limitsFromLS = [
            {
                id: 1,
                category: 'some category',
                limit: '1200',
                deadline: [2021, 11, 23]
            },
            {
                id: 2,
                category: 'some category',
                limit: '12766600',
                deadline: [2021, 11, 23]
            },
            {
                id: 3,
                category: 'some category',
                limit: '166600',
                deadline: [2021, 11, 23]
            }
        ]
        const action = synhronizedLimitsFromLocalStorage(limitsFromLS)
        const modernizedStatePosts = budgetReducer(state, action)
        expect(modernizedStatePosts.limits.length).toBe(3)
    })
})