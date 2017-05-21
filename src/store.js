import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO: 放置初始状态
  isAuth: false, // 是否登录
  authToken: '', // ajax token
  modal: false, // 全局modal
  modalText: '', //弹出框提示语
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  isAuth(state, status) {
    state.isAuth = status
  },
  authToken(state, token) {
    state.authToken = token
  },
  modal(state, status) {
    state.modal = status
  },
  modalText(state, modalText) {
    state.modalText = modalText
  },
}

const getters = {
  getIsAuth: state => { return state.isAuth },
  getAuthToken: state => { return state.authToken },
  getModal: state => { return state.modal },
  getModalText: state => { return state.modalText },
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  getters,
  mutations
})