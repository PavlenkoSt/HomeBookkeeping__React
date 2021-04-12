const addZero = num => num <= 9 ? num = '0' + num : num
    
const getCurrentDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${addZero(day)}.${addZero(month)}.${year}`
}

export default getCurrentDate