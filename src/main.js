import Vue from 'vue'
import App from './App.vue'
import router from './routers/'
import './filters/'
import jquery from 'jquery'
import store from './store'
import Commponents from './ui/index'
import locale from './ui/locale/lang/zh-CN'
import Axios from './http/axios'
import myCommponents from '../src/components'

Vue.use(myCommponents)
Vue.use(Commponents, { locale })
Vue.prototype.http = Axios
Array.prototype.delete = function(delIndex) {
    let temArray = []
    for (let i = 0; i < this.length; i++) {
        if (i != delIndex) {
            temArray.push(this[i])
        }
    }
    return temArray
}
const app = new Vue({
    el: '#app',
    Axios,
    router: router,
    render: h => h(App)
})