import { dateDiffer, nextDate } from './date'
class Utils {

    zerofill = val => val >= 10 ? val + '' : '0' + val //小于10的数据补0
    parseList2Map = (list) => {
            if (!list || list.length === 0) return new Map()
            var map = new Map()
            for (let obj of list.entries()) {
                map.set(obj[1].interfaceKey, obj[1].resultData)
            }
            return map
        }
        //向后台发送请求
    getParams = (params = {}) => {
            let obj = {},
                objs = []
            if (params.statsDates) {
                if (params.statsDates.length === 1) {
                    obj.startDate = params.statsDates[0].startDate
                    obj.endDate = params.statsDates[0].endDate
                } else {
                    obj.statsDates = params.statsDates
                }
            }
            if (params.pmParkIds) {
                obj.pmParkIds = params.pmParkIds
            }
            if (params.fixedDate) {
                obj.fixedDate = params.fixedDate
            }
            if (params.page) {
                obj.page = params.page
            }
            if (params.pmParkId) {
                obj.pmParkId = params.pmParkId
            }
            if (params.parkExitId) {
                obj.parkExitId = params.parkExitId
            }
            if (params.pageSize) {
                obj.pageSize = params.pageSize
            }
            if (params.businessType) {
                obj.businessType = params.businessType
            }
            if (!params.interfaceKey) {
                return JSON.stringify(obj)
            } else {
                if (params.interfaceKey.length === 1) {
                    obj.interfaceKey = params.interfaceKey[0]
                    objs.push(obj)
                } else {
                    for (let key of params.interfaceKey) {
                        let o = {...obj }
                        o.interfaceKey = key
                        objs.push(o)
                    }
                }
            }
            return JSON.stringify(objs)
        }
        /**
         * 给日期补充数据方法
         * startDate 20170205
         */
    fillArrObject = (arr = [], startDate, endDate) => {
            if (!(startDate && endDate)) return
            if (!arr || arr.length === 0) return
            let differ = dateDiffer(startDate, endDate),
                date = startDate,
                nullObj = {}
            Object.assign(nullObj, arr[0])
            for (let n in nullObj) {
                if (!isNaN(nullObj[n])) {
                    nullObj[n] = 0
                }
            }
            for (let i = 0; i < differ; i++) {
                let exist = arr.find((obj) => {
                    return obj.datetime === date
                })
                if (!exist) {
                    nullObj.datetime = date
                    arr.push(Object.assign({}, nullObj))
                }
                date = nextDate(date)
            }
            return arr
        }
        //24小时数据不足进行补充
    fillArrHourObject = (arr = [], maxHour = 24) => {
        if (arr.length === 0) return
        let nullObj = {...arr[0] }, //拷贝数组
            result = []
        for (let n in nullObj) { //循环读取键名
            if (n != 'hour' && !isNaN(nullObj[n])) {
                nullObj[n] = 0
            }
        }
        for (let i = 0; i < maxHour; i++) {
            let exist = arr.find((obj) => {
                return obj.hour === this.zerofill(i)
            })
            if (!exist) {
                nullObj.hour = this.zerofill(i)
                result.push(Object.assign({}, nullObj))
            } else {
                result.push(exist)
            }
        }
        return result
    }



    /*特殊情况24小时补充0 格式{
        "hour": "00",
        "parkExits": [
          {
            "parkExitId": "adfadf1234ad",
            "parkExitName": "出口A", "receivableSum": "0.00",
            "receivableCount": "0.00",
            "incomeSum": "0.00",
            "incomCount": "0"
          }
        ]*/



    fillComplexArrHourObject = (arr = []) => {
            if (arr.length === 0) return
            let nullObj = JSON.parse(JSON.stringify(arr[0])), //深度拷贝
                // let nullObj = _.defaultsDeep({}, ary[0]),//深度拷贝
                objArr = Object.keys(nullObj),
                index = objArr.findIndex((val) => { return val == 'hour' }),
                parkList = nullObj[objArr.delete(index)[0]],
                result = []
            for (var park of parkList) {
                for (var attr in park) {
                    if (!isNaN(park[attr])) {
                        park[attr] = 0
                    }
                }
            }

            for (let i = 0; i < 24; i++) {
                let exist = arr.find((obj) => {
                    return obj.hour === this.zerofill(i)
                })
                if (!exist) {
                    nullObj.hour = this.zerofill(i)
                    result.push(Object.assign({}, nullObj))
                } else {
                    result.push(exist)
                }
            }
            return result
        }
        /**
         * 获取时间的最大
         * @param {*} list 
         */
    getMaxHour(list) {
        return Math.max.apply(Math, list);
    }

}


export default new Utils()