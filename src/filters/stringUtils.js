/*
 *格式化车牌
 * 京A123456->京A·123456
 **/
const parseCarNum = (carNum) => {
    if (!carNum && !/^[a-zA-Z0-9\s\u4E00-\u9FA5]$/.test(carNum))
        return carNum
    return carNum.slice(0, 2).concat('·').concat(carNum.slice(2, carNum.length))
}

const null2zero = (str) => {
    if (str) return str
    return 0
}

const parseAmountAndDHM = (num, type) => {
    if (!num) return
    if (type == 4) {
        let value = ''
        if (num < 0) {
            value = '-'
            num = -num
        }
        let day = parseInt(num / 1440),
            hour = parseInt((num % 1440) / 60),
            minute = num % 60;
        return value.concat(day == 0 ? '' : ''.concat(day).concat('天')).concat(hour == 0 ? '' : hour + '小时').concat(minute + '分')
    } else {
        return ''.concat(Number(num).toFixed(2)).concat('元')
    }
}
const parseAmountAndHM = (num, type) => {
    if (!num) return
    if (type == 4) {
        let hour = parseInt(num / 60),
            minute = num % 60,
            value = '';
        return value.concat(hour == 0 ? '' : hour + '小时').concat(minute + '分')
    } else {
        return ''.concat(Number(num).toFixed(2)).concat('元')
    }
}
const parseCard = (num) => {
    if (!num || isNaN(num)) return
    let arr = String(num).split(''),
        val = ''
    for (let i = 0, l = arr.length; i < l; i++) {
        val += arr[i]
        if (i > 0 && (i + 1) % 4 === 0) val += ' '
    }
    return String(val)
}
const parseMoney = (money) => {
    if (!money || isNaN(money)) return
    money = Number(money).toFixed(2)
    let val = '',
        arr = money.split('.')[0].split('').reverse()
    if (arr.length < 4) return money
    for (let i = 0, l = arr.length; i < l; i++) {
        val += arr[i]
        if (i > 0 && (i + 1) % 3 === 0) val += ','
    }
    if (val.slice(val.length - 1, val.length) === ',') val = val.slice(0, val.length - 1)
    return val.split('').reverse().join('').concat('.').concat(money.split('.')[1])
}

import { CARCOLORNAME, CARCOLOR } from '../assets/js/constants.js'

const parseCarNumColor = (color) => {
    return CARCOLOR[color]
}
const parseCarNumColorName = (color) => {
    return CARCOLORNAME[color]
}
export { parseCarNum, null2zero, parseAmountAndDHM, parseAmountAndHM, parseCard, parseMoney, parseCarNumColor, parseCarNumColorName }