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
    ]
}

const headerReducer = (state = initialValue, action) => {
    switch(action.type){
        default: 
            return state
    }
}

export default headerReducer