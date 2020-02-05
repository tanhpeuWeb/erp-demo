import axios from "axios";
import {Message,Loading} from "element-ui";
import router from '@/router';
/**
 * http请求工具类
 * 
 * 请求拦截器 负责将客户端表示token值存储并且放置在头部提交给服务器
 * 
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */


//创建axios的实例
const service = axios.create({
    timeout: 10000 // 超时时间
});

let loading;
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

const Qs = require('qs');
service.interceptors.request.use((config) => {
        // if (localStorage.tsToken) { //验证token
        //     config.headers.Authorization = localStorage.tsToken
        // } else {
        //     config.headers.Authorization = sessionStorage.tsToken
        // }
        startLoading();
        if (config.method == "post") {
            config.data = Qs.stringify(config.data)
        }
        return config
    },
    (err) => {
        Promise.reject(err)
    }
)
//响应拦截
service.interceptors.response.use((response) => {
        endLoading();
        return response
    },
    (err) => {
        let errMsg = ""
        if (err && err.response.status) {
            switch (err.response.status) {
                case 401:
                    errMsg = '登录状态失效，请重新登录';
                    localStorage.removeItem('tsToken');
                    router.push('/login');
                    break;
                case 403:
                    errMsg = '拒绝访问';
                    break;

                case 408:
                    errMsg = '请求超时';
                    break;

                case 500:
                    errMsg = '服务器内部错误';
                    break;

                case 501:
                    errMsg = '服务未实现';
                    break;

                case 502:
                    errMsg = '网关错误';
                    break;

                case 503:
                    errMsg = '服务不可用';
                    break;

                case 504:
                    errMsg = '网关超时';
                    break;

                case 505:
                    errMsg = 'HTTP版本不受支持';
                    break;

                default:
                    errMsg = err.response.data.msg;
                    break;
            }
        } else {
            errMsg = err;
        }
        Message.error(errMsg);
        return Promise.reject(errMsg);
    }
)

export default service
