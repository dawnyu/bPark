var fs = require('fs'),
    path = "./server/db/",
    unicode = "utf-8",
    _ = require("lodash"),
    dbm = require('./services/dbm')

db01()
db02()
db03()
db04()
db05()
db06()
db07()
db09()
db10()
db11()
db18()
db19()
db21()

function save(pathName, data) {
    fs.open(path + pathName, 'w', 0644, (e, fd) => {
        if (e) throw e
        fs.write(fd, data, 0, unicode, (e) => {
            if (e) throw e;
            fs.closeSync(fd)
        })
    })
}

function getPark() {
    return new dbm(`../db/parkList.json`).read()
}

function zerofill(val) {
    return val >= 10 ? val : '0' + val
}

function db01() {
    var obj = {},
        resultData = []
    random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
    obj.incomeSum = 500.01 + Math.floor(random * 100, 2)
    obj.incomeCount = 100 + Math.floor(random * 30, 2)
    obj.receivableSum = 1500.01 + Math.floor(random * 500, 2)
    obj.receivableCount = 1100 + Math.floor(random * 100, 2)
    obj.derateSum = 1622 + Math.floor(random * 200, 2)
    obj.derateCount = 1200.01 + Math.floor(random * 400, 2)
    obj.onlineSum = 500.01 + Math.floor(random * 100, 2)
    obj.onlineCount = 500.01 + Math.floor(random * 100, 2)
    obj.cashSum = 1200 + Math.floor(random * 300, 2)
    obj.cashCount = 1100 + Math.floor(random * 100, 2)
    resultData.push(obj)
    save("0000001.json", JSON.stringify(resultData))
}

function db02() {
    var resultData = [],
        parkList = getPark(),
        obj = {}
    for (var park in parkList.parkListInfo) {
        var statsData = [],
            resultObj = {},
            temp = {},
            random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        resultObj.pmParkId = parkList.parkListInfo[park].pmParkId
        resultObj.parkName = parkList.parkListInfo[park].parkName
        obj.incomeSum = 500.01 + Math.floor(random * 100, 2)
        obj.incomeCount = 100 + Math.floor(random * 30, 2)
        obj.receivableSum = 1500.01 + Math.floor(random * 500, 2)
        obj.receivableCount = 1100 + Math.floor(random * 100, 2)
        obj.derateSum = 1622 + Math.floor(random * 200, 2)
        obj.derateCount = 1200.01 + Math.floor(random * 400, 2)
        obj.onlineCount = 500.01 + Math.floor(random * 100, 2)
        obj.cashSum = 1200 + Math.floor(random * 300, 2)
        obj.cashCount = 1100 + Math.floor(random * 100, 2)
        obj.opexSum = 100 + Math.floor(random * 30, 2)
        temp = Object.assign({}, obj)
        statsData.push(temp)
        resultObj.statsData = statsData
        resultData.push(resultObj)
    }
    save("0000002.json", JSON.stringify(resultData))
}

function db03() {
    var obj = {},
        resultData = []
    for (let i = 0; i < 24; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        obj.incomeSum = 500.01 + Math.floor(random * 100, 2)
        obj.incomeCount = 100 + Math.floor(random * 30, 2)
        obj.receivableSum = 1500.01 + Math.floor(random * 300, 2)
        obj.receivableCount = 1100 + Math.floor(random * 300, 2)
        obj.derateSum = 500.01 + Math.floor(random * 100, 2)
        obj.derateCount = 1004 + Math.floor(random * 300, 2)
        let o = Object.assign({}, obj)
        o.hour = `${zerofill(i)}`
        resultData.push(o)
    }
    save("0000003.json", JSON.stringify(resultData))
}

function db04() {
    var obj = {},
        now = new Date().getTime(),
        data = []
    for (let i = 0; i < 500; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        obj.incomeSum = 500.01 + Math.floor(random * 100, 2)
        obj.incomeCount = 100 + Math.floor(random * 30, 2)
        obj.receivableSum = 1500.01 + Math.floor(random * 500, 2)
        obj.receivableCount = 1100 + Math.floor(random * 100, 2)
        obj.derateSum = 1622 + Math.floor(random * 200, 2)
        obj.derateCount = 1200.01 + Math.floor(random * 400, 2)
        let o = Object.assign({}, obj),
            date = new Date(now - i * 24 * 60 * 60 * 1000)
        o.dateTime = `${date.getFullYear()}${zerofill((date.getMonth() + 1))}${zerofill(date.getDate())}`
        data.push(o)
    }

    save("0000004.json", JSON.stringify(data))
}

function db05() {
    var obj = {},
        resultData = []
    for (let i = 0; i < 24; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        obj.onlineCount = 500.01 + Math.floor(random * 100, 2)
        obj.onlineSum = 500.01 + Math.floor(random * 100, 2)
        obj.cashSum = 1200 + Math.floor(random * 300, 2)
        obj.cashCount = 1100 + Math.floor(random * 100, 2)
        let o = Object.assign({}, obj)
        o.hour = `${zerofill(i)}`
        resultData.push(o)
    }
    save("0000005.json", JSON.stringify(resultData))
}

function db06() {
    var obj = {},
        now = new Date().getTime(),
        data = []
    for (let i = 0; i < 500; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        obj.onlineCount = 500.01 + Math.floor(random * 100, 2)
        obj.onlineSum = 500.01 + Math.floor(random * 100, 2)
        obj.cashSum = 1200 + Math.floor(random * 300, 2)
        obj.cashCount = 1100 + Math.floor(random * 100, 2)
        let o = Object.assign({}, obj),
            date = new Date(now - i * 24 * 60 * 60 * 1000)
        o.dateTime = `${date.getFullYear()}${zerofill((date.getMonth() + 1))}${zerofill(date.getDate())}`
        data.push(o)
    }
    save("0000006.json", JSON.stringify(data))
}

function db07() {
    var obj = {},
        now = new Date().getTime(),
        data = []
    for (let i = 0; i < 500; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        obj.chargingRatio = 0.72 + Math.floor(random * 0.4, 2)
        let o = Object.assign({}, obj),
            date = new Date(now - i * 24 * 60 * 60 * 1000)
        o.dateTime = `${date.getFullYear()}${zerofill((date.getMonth() + 1))}${zerofill(date.getDate())}`
        data.push(o)
    }
    save("0000007.json", JSON.stringify(data))
}

function db09() {
    var obj = {},
        random = Math.random() * (Math.random() > 0.5 ? 1 : -1),
        resultData = []
    obj.outBigOrderSum = 500 + Math.floor(random * 200, 2)
    obj.outBigOrderCount = 100 + Math.floor(random * 40, 2)
    obj.inBigOrderCount = 100 + Math.floor(random * 40, 2)
    resultData.push(obj)
    save("0000009.json", JSON.stringify(resultData))
}

function db10() {
    var obj = {},
        resultData = [],
        exitName = ["出口1", "出口2", "出口3", "出口4"]
    for (let i = 0; i < 4; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1)
        obj.parkExitId = "a1234134adfadsfasdf234"
        obj.parkExitName = exitName[i]
        obj.receivableSum = 500.01 + Math.floor(random * 200, 2)
        obj.incomeSum = 500.01 + Math.floor(random * 200, 2)
        obj.receivableCount = 100 + Math.floor(random * 40, 2)
        obj.incomCount = 100 + Math.floor(random * 30, 2)
        obj.chargeRadio = Math.random().toFixed(2)
        let temp = Object.assign({}, obj)
        resultData.push(temp)
    }
    save("0000010.json", JSON.stringify(resultData))
}


function db11() {
    var obj = {},
        resultData = [],
        result = {},
        exitName = ["出口1", "出口2", "出口3", "出口4"]
    for (let i = 0; i < 24; i++) {
        let random = Math.random() * (Math.random() > 0.5 ? 1 : -1),
            parkExits = []
        for (let exit in exitName) {
            obj.parkExitId = "adfadf1234ad"
            obj.parkExitName = exitName[exit]
            obj.receivableSum = 10 + Math.floor(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 5, 2)
            obj.receivableCount = 10 + Math.floor(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 6, 2)
            obj.incomeSum = 17 + Math.floor(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 6, 2)
            obj.incomCount = 8 + Math.floor(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 6, 2)
            let temp = Object.assign({}, obj)
            parkExits.push(temp)
        }
        result.parkExits = parkExits
        result.hour = `${zerofill(i)}`
        resultData.push(Object.assign({}, result))
    }
    save("0000011.json", JSON.stringify(resultData))
}

function db18() {
    var parkList = getPark().parkListInfo,
        obj = {},
        status = [0, 1],
        resultData = []
    for (let park of parkList) {
        obj.pmParkId = park.pmParkId
        obj.parkName = park.parkName
        obj.address = park.parkName
        obj.exitCounts = 4 + parseInt(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 2)
        obj.entranceCounts = 4 + parseInt(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 2)
        obj.barrierState = 0
        obj.outCameraState = 0
        obj.ledScreenState = 0
        obj.ledScreenState = 0
        obj.standPCState = 0
        obj.allInOneSoundState = 0
        obj.remoteVoiceState = 0
        obj.tollmanCameraState = 0
        obj.panoramicCameraState = 0
        obj.selfServiceState = status[parseInt(Math.random() * 2)]
        resultData.push(Object.assign({}, obj))
    }
    save("0000018.json", JSON.stringify(resultData))
}

function db19() {
    var parkList = getPark().parkListInfo,
        obj = {},
        status = [0, 1, 9],
        resultData = []
    for (let park of parkList) {
        obj.pmParkId = park.pmParkId
        obj.parkName = park.parkName
        obj.address = park.parkName
        obj.exitCounts = 4 + parseInt(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 2)
        obj.entranceCounts = 4 + parseInt(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 2)
        obj.barrierState = 0
        obj.outCameraState = 0
        obj.ledScreenState = 0
        obj.ledScreenState = 0
        obj.standPCState = 0
        obj.allInOneSoundState = 0
        obj.remoteVoiceState = 0
        obj.tollmanCameraState = 0
        obj.panoramicCameraState = 0
        obj.selfServiceState = status[parseInt(Math.random() * 2)]
        resultData.push(Object.assign({}, obj))
    }
    save("0000019.json", JSON.stringify(resultData))
}

function db21() {
    var obj = {},
        resultData = [],
        tempObj = {},
        cityName = ["北京市", "上海市"],
        parkList = getPark().parkListInfo
    for (let name of cityName) {
        let parkDatas = []
        obj.cityName = name
        let tempList = _.filter(parkList, o => {
            return o.CITY.indexOf(name) > -1
        })
        for (let park of tempList) {
            obj.cityCode = park.CITY_CODE
            tempObj.pmParkId = park.pmParkId
            tempObj.parkName = park.parkName
            tempObj.address = park.parkName
            tempObj.maxCount = 200 + Math.floor(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 50, 2)
            tempObj.restCount = 150 + Math.floor(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 50, 2)
            tempObj.longtitude = parseFloat((116.23234 + Math.random() * 0.111).toFixed(4))
            tempObj.latitude = parseFloat((95.12123 + Math.random() * 0.088).toFixed(4))
            parkDatas.push(Object.assign({}, tempObj))
            obj.parkDatas = [...parkDatas]
        }
        resultData.push(Object.assign({}, obj))
    }
    save("0000021.json", JSON.stringify(resultData))
}