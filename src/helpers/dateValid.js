const removeZero = num => {
    if (+num <= 9) {
        num = num[1];
    }
    return +num;
}

const dateValid = (selectVal, date) => {
    const curDate = new Date();
    const arr = date.split('.');
    const dateTransact = new Date(arr.reverse().join(','));
    switch (selectVal) {
        case 'day':
            if (removeZero(arr[2]) === curDate.getDate() && removeZero(arr[1]) === curDate.getMonth() + 1 && +arr[0] === curDate.getFullYear()) {
                return true;
            }
            return false;
        case 'week':
            const weekStart = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 7);
            if (curDate - dateTransact < curDate - weekStart) {
                return true;
            }
            return false;
        case 'month':
            const monthStart = new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate());
            if (curDate - dateTransact < curDate - monthStart) {
                return true;
            }
            return false;
        case 'year':
            const yearStart = new Date(curDate.getFullYear() - 1, curDate.getMonth(), curDate.getDate());
            if (curDate - dateTransact < curDate - yearStart) {
                return true;
            }
            return false;
        default: 
            return false
    }
}

export default dateValid