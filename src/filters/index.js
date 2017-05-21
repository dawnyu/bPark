/**
 * 此处须把所有过滤器全局化
 */
import Vue from 'vue'
Vue.filter('dateFormatter', require('./dateFormatter').dateFormatter)
Vue.filter('parseParkingTime', require('./dateFormatter').parseParkingTime)
Vue.filter('parseHoursText', require('./dateFormatter').parseHoursText)
Vue.filter('parseHoursValue', require('./dateFormatter').parseHoursValue)
Vue.filter('parseCarNum', require('./stringUtils').parseCarNum)
Vue.filter('null2zero', require('./stringUtils').null2zero)
Vue.filter('parseAmountAndDHM', require('./stringUtils').parseAmountAndDHM)
Vue.filter('parseAmountAndHM', require('./stringUtils').parseAmountAndHM)
Vue.filter('zerofill', require('./dateFormatter').zerofill)
Vue.filter('parseCard', require('./stringUtils').parseCard)
Vue.filter('parseMoney', require('./stringUtils').parseMoney)