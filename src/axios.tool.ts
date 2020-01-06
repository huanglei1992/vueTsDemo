/**
 * axios公共处理
 * 1、取消重复的请求
 * 2、集中处理接口失败的普通情况
 * 3、设置默认的表头
 * 4、设置默认的请求前缀
 * 5、设置请求超时限制
 * 6、设置token过期或者重新登录时，请求接口的处理，此时刷新页面到登录
 * 7、绑定公共的请求方法到vue原型：get和post
 */
import Vue from "vue";
import axios from "axios";
import qs from "qs";

// 取消请求
const CancelToken = axios.CancelToken;
// 设置默认请求头
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "Cache-Control": "no-cache",
  "If-Modified-Since": "0"
};
// Axios中post请求将data数据以request payload转换为form data的形式
axios.defaults.transformRequest = [
  function(data: any) {
    return qs.stringify(data);
  }
];
let _window: any = window;
//设置默认的请求前缀
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" &&
  _window.location.pathname.indexOf("qualityBoard3") > -1
    ? process.env.VUE_APP_URL1
    : process.env.VUE_APP_URL;
// 请求超时的时间限制
axios.defaults.timeout = 20000;
// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
const pending: any = {};
const removePending = (key: any, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("取消重复请求");
  }
  delete pending[key];
};
/**
 * config: 请求数据
 * isReuest: 请求拦截器中 config.url = '/users', 响应拦截器中 config.url = 'http://localhost:3000/users'，所以加上一个标识来计算请求的全路径
 */
const getRequestIdentify = (config: any, isReuest = false) => {
  let url = config.url;
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length);
  }
  return config.method === "get"
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data));
};
axios.interceptors.request.use(
  (config: any) => {
    // 拦截重复请求(即当前正在进行的相同请求)
    let requestData = getRequestIdentify(config, true);
    removePending(requestData, true);

    config.cancelToken = new CancelToken(c => {
      pending[requestData] = c;
    });

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
var account = _window.user ? _window.user.account : "";
// 请求到结果的拦截处理
axios.interceptors.response.use(
  (response: any) => {
    // 把已经完成的请求从 pending 中移除
    let requestData = getRequestIdentify(response.config);
    removePending(requestData);
    // 对响应数据做点什么
    if (process.env.NODE_ENV !== "development") {
      // sessionStatus 浏览器不一样，大小写不一样
      if (
        (response.headers.SESSIONSTATUS &&
          response.headers.SESSIONSTATUS === "TIMEOUT") ||
        (response.headers.Sessionstatus &&
          response.headers.Sessionstatus === "TIMEOUT") ||
        (response.headers.sessionstatus &&
          response.headers.sessionstatus === "TIMEOUT")
      ) {
        // 如果接口返回timeout,表示当前账号实际退出了，不管当前用户显示不显示，都刷新为未登录状态
        window.location.href = "https:///ux.21cn.com";
      } else if (
        (response.headers.USER && response.headers.USER !== account) ||
        (response.headers.User && response.headers.User !== account) ||
        (response.headers.user && response.headers.user !== account)
      ) {
        // 如果当前接口返回显示当前已经登录，而页面显示未登录或者显示登录的账号与实际登录的账号不一致，则刷新为正确账号
        // 当切换了账号，重新刷新页面登录
        window.location.reload();
      }
    }

    if (
      response.data.code !== undefined &&
      parseInt(response.data.code) !== 0
    ) {
      //接口错误处理
    }
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
  }
);
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res: any) => {
        resolve(res); // 返回请求成功的数据 data
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
