import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const department = resolve => require(['../pages/department'], resolve)
const departedit = resolve => require(['../pages/departedit'], resolve)
const userlist = resolve => require(['../pages/userlist'], resolve)
const useredit = resolve => require(['../pages/useredit'], resolve)
const roleedit = resolve => require(['../pages/roleedit'], resolve)
const rolelist = resolve => require(['../pages/rolelist'], resolve)
const resources = resolve => require(['../pages/resources'], resolve)
const resourceedit = resolve => require(['../pages/resourceedit'], resolve)
const userrole = resolve => require(['../pages/userrole'], resolve)
const authortree = resolve => require(['../pages/authortree'], resolve)
const onorder = resolve => require(['../pages/onorder'], resolve)
const outorder = resolve => require(['../pages/outorder'], resolve)
const inParkOrderMag = resolve => require(['../pages/inParkOrderMag'], resolve)
const outParkOrderMag = resolve => require(['../pages/outParkOrderMag'], resolve)
const test = resolve => require(['../pages/test'], resolve)
Vue.use(VueRouter)

const router = new VueRouter({
        base: 'statweb',
        mode: '', //空值带锚点，history:html5模式 去掉锚点
        saveScrollPosition: true, //记住页面的滚动位置 html5模式适用
        routes: [{
                path: '/department',
                component: department
            },
            {
                path: '/departedit',
                component: departedit
            },
            {
                path: '/userlist',
                component: userlist
            },
            {
                path: '/useredit',
                component: useredit
            },
            {
                path: '/roleedit',
                component: roleedit
            },
            {
                path: '/rolelist',
                component: rolelist
            },
            {
                path: '/resources',
                component: resources
            },
            {
                path: '/resourceedit',
                component: resourceedit
            },
            {
                path: '/authortree',
                component: authortree
            },
            {
                path: '/userrole',
                component: userrole
            },
            {
                path: '/outParkOrderMag',
                component: outParkOrderMag
            },
            {
                path: '/inParkOrderMag',
                component: inParkOrderMag
            },
            {
                path: '/onorder',
                component: onorder
            },
            {
                path: '/outorder',
                component: outorder
            },
            {
                path: '/test',
                component: test
            }
        ]
    })
    // 路由跳转 Logger
router.beforeEach((to, from, next) => {
    console.log(`[route:] ${decodeURI(from.path)} => ${decodeURI(to.path)}`)
    next()
})

export default router