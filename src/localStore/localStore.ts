const localStore = {
    set(name: string, obj: any){
        const json = JSON.stringify(obj)
        localStorage.setItem(name, json)
    },
    get(name: string){
        const obj: any = localStorage.getItem(name)
        return JSON.parse(obj)
    }
}

export default localStore