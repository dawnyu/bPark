/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
const zerofill = val => val >= 10 ? val : '0' + val

const dateFormatter = (time, timeType, type) => {
    if (!time) return
    if (timeType == 1) {
        time = time.slice(0, 4).concat('/').concat(time.slice(4, 6)).concat('/').concat(time.slice(6, 8))
            .concat(' ').concat(time.slice(8, 10)).concat(':').concat(time.slice(10, 12)).concat(':').concat(time.slice(12, 14))
    }
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let second = date.getSeconds()

    switch (type) {
        case 0: // 01-05
            return `${zerofill(month)}-${zerofill(day)}`
        case 1: // 11:12
            return `${zerofill(hours)}-${zerofill(minutes)}`
        case 2: // 2016-11-05
            return `${year}-${zerofill(month)}-${zerofill(day)}`
        case 3: //  2016-11-05 11:12
            return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
        case 4: //  2016.11.05 11:12
            return `${year}.${zerofill(month)}.${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 5: // 2016-11-05
            return `${year}.${zerofill(month)}.${zerofill(day)}`
        case 6: // 2016-11-05
            return `${hours}:${zerofill(minutes)}:${zerofill(second)}`
        case 7: //  2016-11-05 11:12:13
            return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 8: //  11:12:13
            return `${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        default:
            return ""
    }
}

/**
 * 数字
 * @param {*} time
 */
const parseParkingTime = (time) => {
    if (!time) {
        return '00:00:00';
    }
    time = time * 1;
    let h = parseInt((time / 60) / 60);
    let m = parseInt((time - h * 60 * 60) / 60);
    let s = (time - h * 60 * 60 - m * 60) % 60;
    if ((h + '').length < 2) {
        h = '0' + h;
    }
    if ((s + '').length < 2) {
        s = '0' + s;
    }
    if ((m + '').length < 2) {
        m = '0' + m;
    }
    return h + ':' + m + ':' + s;
}

/**
 * 字符串
 * @param {*} time
 */
const parseParkingTimeStr = (time = '') => {
    return time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4, 6)
}

const parseHoursValue = (minutes) => {
    let hour = parseInt(minutes / 60),
        minute = minutes % 60,
        value = '';
    return value.concat(hour == 0 ? '' : hour + '小时').concat(minute == 0 ? '' : minute + '分钟').concat('停车券')
}
const parseHoursText = (minutes) => {
    let hour = parseInt(minutes / 60),
        minute = minutes % 60,
        desc = '';
    return desc.concat('抵扣').concat(hour == 0 ? '' : hour + '小时').concat(minute == 0 ? '' : minute + '分钟').concat('停车时长')
}

const secondTohms = (time) => {
    if (!time) {
        return "00:00:00";
    }
    time = time * 1;
    var h = parseInt((time / 60) / 60);
    var m = parseInt((time - h * 60 * 60) / 60);
    var s = (time - h * 60 * 60 - m * 60) % 60;
    if ((h + "").length < 2) {
        h = "0" + h;
    }
    if ((s + "").length < 2) {
        s = "0" + s;
    }
    if ((m + "").length < 2) {
        m = "0" + m;
    }
    return h + ":" + m + ":" + s;
}
export { dateFormatter, parseParkingTime, parseHoursValue, parseHoursText, secondTohms, parseParkingTimeStr, zerofill }