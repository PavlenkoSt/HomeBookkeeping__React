const CHANGE_REDIRECT_PATH = 'CHANGE_REDIRECT_PATH'
const CHANGE_MODAL_MODE = 'CHANGE_MODAL_MODE'

export const changeRedirectPath = (page: string, path: string) => ({ type: CHANGE_REDIRECT_PATH , page, path})
export const changeModalMode = (mode: boolean) => ({ type: CHANGE_MODAL_MODE , mode})

export type PathType = {
    id: number
    text: string
    to: string
    childLinks: Array<ChildLinkType>
}

export type RedirectType = {
    page: string
    redirect: string
}

type ChildLinkType = {
    id: number
    text: string
    to: string
}

const initialValue = {
    paths: [
        {id: 0, text: 'Добавить', to: '/add', childLinks: [
                { id: 0, text: 'Доход', to: '/add/income' },
                { id: 1, text: 'Расход', to: '/add/outcome' }
            ]}, 
        {id: 1, text: 'Статистика', to: '/statistics', childLinks: [
            { id: 0, text: 'Журнал', to: '/statistics/journal' },
            { id: 1, text: 'Отчеты', to: '/statistics/reports' }
        ]}, 
        {id: 2, text: 'Бюджет', to: '/budget', childLinks: [
            { id: 0, text: 'Планирование', to: '/budget/planning' },
            { id: 1, text: 'Лимиты', to: '/budget/limits' }
        ]}, 
    ],
    autoRedirect: [
        {page: '/add', redirect: '/add/income'},
        {page: '/statistics', redirect: '/statistics/journal'},
        {page: '/budget', redirect: '/budget/planning'},
    ],
    modalMode: false,
}

const headerReducer = (state = initialValue, action: any) => {
    switch(action.type){
        case CHANGE_REDIRECT_PATH: {
            const redirectItem = state.autoRedirect.filter( item => item.page === action.page)
            return {
                ...state,
                autoRedirect: [...state.autoRedirect, redirectItem[0].redirect = action.path]
            }
        }
        case CHANGE_MODAL_MODE: {
            return {
                ...state,
                modalMode: action.mode
            }
        }
        default: 
            return state
    }
}

export default headerReducer