let zerofill = val => val >= 10 ? val : '0' + val

/**格式化时*/
export const dateFormatter = (time, type) => {
    if (!time) return
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
        case 5: // 2016.11.05
            return `${year}.${zerofill(month)}.${zerofill(day)}`
        case 6: // 2016:11:05
            return `${hours}:${zerofill(minutes)}:${zerofill(second)}`
        case 7: //  2016-11-05 11:12:13
            return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 8: //  11:12:13
            return `${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 9: // 20161105
            return `${year}${zerofill(month)}${zerofill(day)}`
        default:
            return ""
    }
}

/**
 * @param d:前推几天
 * @param m: 前推几个
 * @param y: 前推几年
 */
export const getDateAgo = (d, m = 0, y = 0) => {
    let current = new Date(),
        date = current.getTime(),
        currentYear = current.getFullYear(),
        currentMonth = current.getMonth() + 1,
        currentDate = current.getDate()
    if (d < 0 || m < 0 || y < 0) return
    if (d && isNaN(d) || m && isNaN(m) || y && isNaN(y)) return
    if (d) {
        currentMonth = currentMonth - m % 12
        currentYear = currentYear - y - Math.floor(m / 12)
        if (currentMonth < 0) {
            currentMonth += 12
            currentYear--
        }
        date = Date.parse(`${currentYear}/${currentMonth}/${currentDate} 00:00:00`)
        return dateFormatter(date - (d - 1) * 24 * 60 * 60 * 1000, 9)
    } else {
        currentMonth = currentMonth - m % 12 + 1
        currentYear = currentYear - y - Math.floor(m / 12)
        if (currentMonth < 0) {
            currentMonth += 12
            currentYear--
        }
        return `${currentYear}${zerofill(currentMonth)}`
    }
}

export const secondTohms = (time) => {
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
    /**
     * 日期
     * @param {*} date1
     * @param {*} date2
     * @return number
     */
export const dateDiffer = (date1, date2) => {
    if (!date1 || !date2) return
    try {
        return Math.abs((parseStrDate(date1) - parseStrDate(date2)) / 1000 / 60 / 60 / 24) + 1
    } catch (error) {
        return '日期格式化出'
    }
}

/**
 * 获取下一个日
 * @param date
 * @return yyyymmdd
 */
export const nextDate = (date) => {
    if (!date) return
    return dateFormatter(new Date(parseStrDate(date)).getTime() + 24 * 60 * 60 * 1000, 9)
}

/**
 * 把字符串日期格式化成日期字符��
 * @param {*} date
 */
function parseStrDate(date) {
    return Date.parse(date.slice(0, 4).concat('/').concat(date.slice(4, 6)).concat('/').concat(date.slice(6, 8)).concat(" 00:00:00"))
}
var now = new Date(),
    nowDayOfWeek = now.getDay(),
    nowDay = now.getDate(),
    nowMonth = now.getMonth(),
    nowYear = now.getYear()
nowYear += (nowYear < 2000) ? 1900 : 0

/**
 * 获取当前季度开始月
 */
export const getQuarterStartMonth = () => {
    let quarterStartMonth = 0
    if (nowMonth < 3) {
        quarterStartMonth = 0
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9
    }
    return quarterStartMonth
}

/**
 * 获得本日日期
 */
export const getToDate = () => {
    return dateFormatter(new Date().getTime(), 2)
}

/**
 * 获得本周的开端日
 */
export const getWeekStartDate = () => {
    let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
    return dateFormatter(weekStartDate, 2)
}

/**
 * 获得本周的结束日
 */
export const getWeekEndDate = () => {
    let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
    return dateFormatter(weekEndDate, 2)
}

/**
 * 获得本月的开端日
 */
export const getMonthStartDate = () => {
    let monthStartDate = new Date(nowYear, nowMonth, 1)
    return dateFormatter(monthStartDate, 2)
}

/**
 * 获得本月的停止日
 */
export const getMonthEndDate = () => {
    let monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))
    return dateFormatter(monthEndDate, 2)
}

/**
 * 获得上月开端时
 */
export const getLastMonthStartDate = () => {
    let lastMonthStartDate = new Date(nowYear, lastMonth, 1)
    return dateFormatter(lastMonthStartDate, 2)
}

/**
 * 获得上月停止时
 */
export const getLastMonthEndDate = () => {
    let lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth))
    return dateFormatter(lastMonthEndDate, 2)
}

/**
 * 获得本季度的开端日��
 */
export const getQuarterStartDate = () => {
    let quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1)
    return dateFormatter(quarterStartDate, 2)
}

/**
 * 或的本季度的停止日期
 */
export const getQuarterEndDate = () => {
    let quarterEndMonth = getQuarterStartMonth() + 2
    let quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth))
    return dateFormatter(quarterStartDate, 2)
}

/**
 * 本年第一
 */
export const getYearStartDate = () => {
    let yearStartDate = new Date(nowYear, 0, 1)
    return dateFormatter(yearStartDate, 2)
}

/**
 * date仅限 yyyy-mm-dd
 * @param {*} date
 */
export const getLastYearToday = (date) => {
    let year = nowYear,
        month = nowMonth,
        day = nowDay
    if (date) {
        year = date.slice(0, 4)
        month = date.slice(5, 7)
        day = date.slice(8, 10)
    }
    let lastYearToday = new Date(year - 1, month - 1, day)
    return dateFormatter(lastYearToday, 2)
}

/**
 * 获取今日yyyymmdd
 */
export const getToday = () => {
        let today = new Date(nowYear - 1, nowMonth - 1, nowDay)
        return dateFormatter(today, 9)
    }
    /**
     * 获取昨天 2017-01-01
     */
export const getLastday = () => {
    let lastDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime()
    return dateFormatter(lastDate, 2)
}