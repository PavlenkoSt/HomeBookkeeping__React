const DELETE_PLAN = 'DELETE_PLAN'
const CHANGE_COMPLETED_STATUS = 'CHANGE_COMPLETED_STATUS'
const ADD_NEW_PLAN = 'ADD_NEW_PLAN'
const SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE = 'SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE'
const DELETE_LIMIT = 'DELETE_LIMIT'
const ADD_NEW_LIMIT = 'ADD_NEW_LIMIT'
const SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE = 'SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE'

export const deletePlan = id => ({ type: DELETE_PLAN, id })
export const changeCompletedStatus = (id, status) => ({ type: CHANGE_COMPLETED_STATUS, id, status })
export const addNewPlan = plan => ({ type: ADD_NEW_PLAN, plan })
export const synhronizedPlansFromLocalStorage = plans => ({ type: SYNHRONIZED_PLANS_FROM_LOCAL_STORAGE, plans })
export const deleteLimit = id => ({ type: DELETE_LIMIT, id })
export const addNewLimit = limit => ({ type: ADD_NEW_LIMIT, limit })
export const synhronizedLimitsFromLocalStorage = limits => ({ type: SYNHRONIZED_LIMITS_FROM_LOCAL_STORAGE, limits })


const initialValue = {
    plans: [],
    limits: []
}

const budgetReducer = (state = initialValue, action) => {
    switch(action.type){
        case DELETE_PLAN: {
            return {
                ...state,
                plans: state.plans.filter(plan => plan.id !== action.id)
            }
        }
        case CHANGE_COMPLETED_STATUS: {
            return {
                ...state,
                plans: state.plans.map(plan => {
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
                limits: state.limits.filter(limit => limit.id !== action.id)
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