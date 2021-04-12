const localStore = {
    set(name, obj){
        const json = JSON.stringify(obj)
        localStorage.setItem(name, json)
    },
    get(name){
        const obj = localStorage.getItem(name)
        return JSON.parse(obj)
    }
}

export default localStore