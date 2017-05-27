import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://123.207.164.146:8990/btcauthorize/';
axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//var baseURL = 'http://localhost:8989/'
//上线前去掉
var baseURL = 'http://demo.baomidou.com:9515/'
if (location.host.indexOf('prep') > -1 || location.host.indexOf('test') > -1) {
    baseURL = 'http://prep.tingjiandan.com/'
} else if (location.host.indexOf('open') > -1) {
    baseURL = 'http://open.tingjiandan.com/'
}
// http request 拦截器
axios.interceptors.request.use(
    config => {
        //上线前去掉if
        if (config.url.indexOf("parkList") > -1) {
            config.url = "http://localhost:8989/" + config.url
        } else {
            config.url = baseURL + config.url
        }
        // config.url = baseURL + config.url
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