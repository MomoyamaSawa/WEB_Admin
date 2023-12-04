// 获取时间结果
export const getTime = (): string => {
    console.log('getTime')
    let hours = new Date().getHours()
    if (hours >= 6 && hours < 9) {
        return '早上'
    } else if (hours >= 9 && hours < 12) {
        return '上午'
    } else if (hours >= 12 && hours < 14) {
        return '中午'
    } else if (hours >= 14 && hours < 18) {
        return '下午'
    } else if (hours >= 18 && hours < 24) {
        return '晚上'
    } else {
        return '凌晨'
    }
}
