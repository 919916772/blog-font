import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL:" /api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})


service.interceptors.request.use(config => {
  //此处进行token等数据处理
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
});

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      if (response.status === 200) { // 用于查询测评报告进度
        return res
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired; 50018: not login;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 50018) {
        return
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    let message = '请求出错，请联系管理员！'
    const language = getCookie('language')
    if (error.message === 'Network Error') {
      window.location.href = process.env.VUE_APP_BASE_URL + '/login?sysid=mzcp&service=' + window.location.origin + process.env.VUE_APP_BASE_LOGIN
      return
    }
    if (error.message.indexOf('Request failed') > -1) {
      message = '请求失败，请检查！'
    }
    if (error.message.indexOf('timeout of') > -1) {
      message = '请求超时，请重新操作！'
    }
    Message({
      message: language === 'zh' ? message : error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
