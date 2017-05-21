import BlockTitle from './blockTitle'
import Ztree from './ztree'
const myComponents = {
    'blockTitle': BlockTitle,
    'ztree': Ztree
}
const install = function(Vue, opts = {}) {
    Object.keys(myComponents).forEach((key) => {
        Vue.component(key, myComponents[key]);
    });

};

module.exports = Object.assign(myComponents, { install });