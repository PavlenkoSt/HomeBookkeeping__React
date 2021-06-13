import headerReducer, { 
    changeRedirectPath, changeModalMode
} from "../headerReducer"

const state = {
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

describe('header reducers', () => {
    it('modalMode should be true', () => {
        const action = changeModalMode(true)
        const modernizedStatePosts = headerReducer(state, action)
        expect(modernizedStatePosts.modalMode).toBe(true)
    })
    it('redirect in autoRedirect[0] should be /add/outcome', () => {
        const action = changeRedirectPath('/add', '/add/outcome')
        const modernizedStatePosts = headerReducer(state, action)
        expect(modernizedStatePosts.autoRedirect[0].redirect).toBe('/add/outcome')
    })
})