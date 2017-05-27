import BlockTitle from './blockTitle'
import ParkTitle from './parkTitle/'
import CarNumDatePickerHeader from './carNumDatePickerHeader'
import Ztree from './ztree'
import CarNum from './carNum'
import CarCard from './carCard'
import RelevanceCar from './relevanceCar'
const myComponents = {
    'blockTitle': BlockTitle,
    'parkTitle': ParkTitle,
    'carNumDatePickerHeader': CarNumDatePickerHeader,
    'ztree': Ztree,
    'carNum': CarNum,
    'relevanceCar': RelevanceCar,
    'carCard': CarCard
}
const install = function(Vue, opts = {}) {
    Object.keys(myComponents).forEach((key) => {
        Vue.component(key, myComponents[key]);
    });

};

module.exports = Object.assign(myComponents, { install });