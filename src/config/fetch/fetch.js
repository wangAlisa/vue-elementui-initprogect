
/**
  1.第一个参数为api的key
  2.第二个参数为数据
  3.allback设置返回数据的层级.等于0直接返回的是data字段,等于1返回全部数据设置,默认为0;
  4.needLoading设置是否需要全局loading.默认为false;
      this.$service.get('getcompany', {},{allback:0,needLoading:true}).then(res => {
        this.companyList = res;
      });
  */
/* eslint-disable */
import Axios from 'axios';
// import Qs from 'qs';
import {checkState} from '@config/fetch/resstatus';
import NProgress from 'nprogress';
import Message from '@common/message';
import API from '@api';
import {localStorage} from '@common/utils';
import {Loading} from 'element-ui';

const axios = Axios.create({
	baseURL: '/',
	responseType: 'json',
	withCredentials: true, // 是否允许带cookie这些
  headers: {
		'Content-Type': 'application/json'
	}
});
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 请求进度条
    NProgress.start();
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 抛出错误
    Message.error('请求中错误:' + error);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 抛出错误
    Message.error('响应后错误:' + error);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 返回生成的API接口
function returnApi(api) {
  let _api;
  if (!api || typeof api !== 'string') {
    return _api;
  }
  if (process.env.HOST === 'easymock') {
    _api = process.env.VUE_APP_MOCKAPI + api; // mock数据
  } else {
    _api = process.env.VUE_APP_PROXY + api; // 开发走代理，线上直接走接口
  }
  return _api;
}
/**
 * GET
 *
 * @param {string} api, 请求路径,
 * @param {Object} data, 请求数据
 * @return {Deferred}, dfd
 */
function get(api, data, options) {
  let newApi = returnApi(API[api]);
  if (!newApi) return;
  let formData = {
    url: newApi,
    method: 'GET',
    timeout: 10000,
    withCredentials: true // 设置跨域请求为true，如果是cros同源请求的话，则可以不用加此项
  };
  // 判断参数是否存在，存在则传入方法中
  if (data && typeof data === 'object') {
    formData.params = data;
  }
  // 根据需要可以设置一些所有接口共有的参数
  formData.params = {
    ...formData.params
  };
  return returnResponse(formData, options);
}

/**
 * POST
 *
 * @param {string} api, 请求路径,
 * @param {Object} data, 请求数据
 * @return {Deferred}, dfd
 */
function post(api, data, options) {
  let newApi = returnApi(API[api]);
  if (!newApi) return;
  let formData = {
    url: newApi,
    method: 'POST',
    timeout: 10000,
    withCredentials: true, // 设置跨域请求为true，如果是cros同源请求的话，则可以不用加此项
    data
  };
  // 根据需要可以设置一些所有接口共有的参数
  formData.data = {
    ...formData.data
  };
  return returnResponse(formData, options);
}

// 返回请求数据
function returnResponse(formData, options) {
  options = Object.assign({}, {allback: 0, needLoading: false}, options);
  let loadingInstance;
  if (options.needLoading) {
    loadingInstance = Loading.service({fullscreen: true});
  }
  // 使用Promise方法异步处理请求
  let promise = new Promise((resolve, reject) => {
    axios(formData)
      .then(function(response) {
        loadingInstance && loadingInstance.close();
        // 后端返回的数据挂载在res.data内
        // 如果allback=1则不做验证 直接返回数据
        NProgress.done();
        if (options.allback) {
          resolve(response.data);
        } else {
          checkState(response.data, resolve, reject);
        }
      })
      .catch(function(error) {
        loadingInstance && loadingInstance.close();
        Message.error('接口请求失败，请查证' + error);
      });
  });
  return promise;
}

export default {
  get: get,
  post: post
};
