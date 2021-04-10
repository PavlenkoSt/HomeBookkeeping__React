const localStore = {
    history: {
        set(history){
            const json = JSON.stringify(history)
            localStorage.setItem('history', json)
        },
        get(){
            const history = localStorage.getItem('history')
            return JSON.parse(history)
        }
    },
    bill: {
        set(bill){
            const json = JSON.stringify(bill)
            localStorage.setItem('bill', json)
        },
        get(){
            const bill = localStorage.getItem('bill')
            return JSON.parse(bill)
        }
    }
}

export default localStore