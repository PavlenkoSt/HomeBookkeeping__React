export type PlanType = {
    id: number,
    task: string,
    sum: string,
    completed: boolean
}

export type LimitType = {
    id: number,
    category: string,
    limit: string,
    deadline: Array<number>
}

const DELETE_PLAN = 'DELETE_PLAN'
const CHANGE_COMPLETED_STATUS = 'CHANGE_COMPLETED_STATUS'
const ADD_NEW_PLAN = 'ADD_NEW_PLAN'
const SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE = 'SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE'
const DELETE_LIMIT = 'DELETE_LIMIT'
const ADD_NEW_LIMIT = 'ADD_NEW_LIMIT'
const SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE = 'SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE'

export const deletePlan = (id: number) => ({ type: DELETE_PLAN, id })
export const changeCompletedStatus = (id: number, status: boolean) => ({ type: CHANGE_COMPLETED_STATUS, id, status })
export const addNewPlan = (plan: PlanType) => ({ type: ADD_NEW_PLAN, plan })
export const synhronizedPlansFromLocalStorage = (plans: Array<PlanType>) => ({ type: SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE, plans })
export const deleteLimit = (id: number) => ({ type: DELETE_LIMIT, id })
export const addNewLimit = (limit: LimitType) => ({ type: ADD_NEW_LIMIT, limit })
export const synhronizedLimitsFromLocalStorage = (limits: Array<LimitType>) => ({ type: SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE, limits })


const initialValue = {
    plans: [],
    limits: []
}

const budgetReducer = (state = initialValue, action: any) => {
    switch(action.type){
        case DELETE_PLAN: {
            return {
                ...state,
                plans: state.plans.filter((plan: PlanType) => plan.id !== action.id)
            }
        }
        case CHANGE_COMPLETED_STATUS: {
            return {
                ...state,
                plans: state.plans.map((plan: PlanType) => {
                    if(plan.id === action.id){
                        plan.completed = action.status
                    }
                    return plan
                })
            }
        }
        case ADD_NEW_PLAN: {
            return {
                ...state,
                plans: [...state.plans, action.plan ]
            }
        }
        case SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE: {
            return {
                ...state,
                plans: action.plans
            }
        }
        case DELETE_LIMIT: {
            return {
                ...state,
                limits: state.limits.filter((limit: LimitType) => limit.id !== action.id)
            }
        }
        case ADD_NEW_LIMIT: {
            return {
                ...state,
                limits: [...state.limits, action.limit]
            }
        }
        case SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE: {
            return {
                ...state,
                limits: action.limits
            }
        }
        default: 
            return state
    }
}

export default budgetReducer