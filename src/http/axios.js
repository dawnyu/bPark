import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://123.207.164.146:8989/api/';
axios.defaults.baseURL = 'http://localhost:8989/btcauthorize/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var baseURL = {
        MNT: 'http://localhost:8989/api/',
        CAT: 'http://localhost:8989/api/'
    }
    // http request 拦截器
axios.interceptors.request.use(
    config => {
        // var demo = false
        // if (window.location.href.indexOf("demo") != -1) {
        //   //todo
        // }
        config.data = qs.stringify(config.data)
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
            }
        }
        return Promise.reject(error.response.data)
    });

export default axios;