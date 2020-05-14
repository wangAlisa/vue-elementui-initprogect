/**
 * @description: 公共方法封装
 */
/* eslint-disable */
export function getUrlParams() {
  let result = {};
  let params = window.location.search.substring(1).split('&');
  let param;
  for (let i = 0, iLen = params.length; i < iLen; i++) {
    param = params[i].split('=');
    if (param.length === 2) {
      result[param[0]] = decodeURIComponent(param[1]);
    }
  }
  return result;
}

export let getCookie = function (name) {
  let cookie = '; ' + document.cookie;
  let pointer = cookie.indexOf('; ' + name + '=');
  let nextPointer = cookie.indexOf(';', pointer + 2);
  if (pointer >= 0) {
    return decodeURIComponent(cookie.substring(pointer + name.length + 3, nextPointer > 0 ? nextPointer : cookie.length));
  }
  return '';
};

export let setCookie = function (uid, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = uid + '=' + escape(value) +
    ((expiredays == null) ? '' : '; expires=' + exdate.toGMTString()) + '; path=/';
};

export let getPathParams = function () {
  var pathName = window.location.pathname.split('/');
  return pathName;
};

export let isArray = function (obj) {
  if (obj) {
    return (typeof obj === 'object') && obj.constructor === Array;
  } else {
    return false;
  }
};

// 一个数拆解成2的次幂的和
export let sumDecomposePower = function (sum) {
  sum = parseInt(sum);
  let result = [];
  if (isNaN(sum)) {
    //
  } else if (sum === 1 || sum === 0) {
    result.push(sum + '');
  } else {
    _recursion();
  }

  function _recursion() {
    for (let i = 0; ; i++) {
      let twoPow = Math.pow(2, i);
      if (twoPow === sum) {
        result.push(twoPow + '');
        sum = sum - twoPow;
        break;
      } else if (twoPow > sum) {
        let preTwoPow = Math.pow(2, i - 1);
        result.push(preTwoPow + '');
        sum = sum - preTwoPow;
        break;
      }
    }
    if (sum > 0) {
      _recursion(sum);
    }
  }
  return result;
};
/**
 * 将对象转换成=链接的{key，value}并用&链接的 字符串
 * @param obj
 * @returns {string}
 */
export let objectToStr = function (obj) {
  let strArr = [];
  for (let Key in obj) {
    let str = '';
    if (isArray(obj[Key])) {
      let arrInArr = [];
      let strInArrVale = '';
      obj[Key].forEach((value, index) => {
        strInArrVale = Key + '[]=' + (value || '');
        arrInArr.push(strInArrVale);
      });
      str = arrInArr.join('&');
    } else {
      str = Key + '=' + (obj[Key] ? obj[Key] : '');
    }
    strArr.push(str);
  }
  return strArr.join('&');
};

/**
 * 讲对象转化成数组
 * @param obj
 * @returns {array}
 */

export let objectToArr = function (obj) {
  if (isArray(obj)) {
    return obj;
  }
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};

/**
 * 判断浏览器是否支持localStorage
 * @returns {boolean}
 */
export function isStorageSupport() {
  try {
    return window.localStorage || false;
  } catch (e) {
    return false;
  }
}

/**
 * localStorage 方法封装，设置缓存数据带有项目前缀
 */
export let localStorage = {
  prefix: '',
  setItem: function (key, val) { // save
    if (isStorageSupport()) {
      window.localStorage.setItem(this.prefix + key, val);
    }
  },
  getItem: function (key) {
    if (isStorageSupport()) { // get
      return window.localStorage.getItem(this.prefix + key);
    }
  },
  removeItem: function (key) {
    if (isStorageSupport()) { // remove
      window.localStorage.removeItem(this.prefix + key);
    }
  },
  map: function () {
    if (isStorageSupport()) { // keys
      var map = {};
      for (var i = 0; i < window.localStorage.length; i++) {
        map[window.localStorage.key(i).match(/^blackbats-(.*)$/)[1]] = window.localStorage.getItem(window.localStorage.key(i));
      }
      return map;
    }
    return null;
  },
  clear: function () {
    if (isStorageSupport()) { // clear 慎用：会影响到其它使用 storage 的地方。
      window.localStorage.clear();
    }
  }
};

/**
 * 判断浏览器是否支持sessionStorage
 * @returns {boolean}
 */
export function isSessionStorageSupport() {
  try {
    return window.sessionStorage || false;
  } catch (e) {
    return false;
  }
}

/**
 * sessionStorage 方法封装，设置缓存数据带有项目前缀
 */
export let sessionStorage = {
  prefix: 'blackbats-',
  setItem: function (key, val) { // save
    if (isSessionStorageSupport()) {
      window.sessionStorage.setItem(this.prefix + key, val);
    }
  },
  getItem: function (key) {
    if (isSessionStorageSupport()) { // get
      return window.sessionStorage.getItem(this.prefix + key);
    }
  },
  removeItem: function (key) {
    if (isSessionStorageSupport()) { // remove
      window.sessionStorage.removeItem(this.prefix + key);
    }
  },
  map: function () {
    if (isSessionStorageSupport()) { // keys
      let sessionMap = {};
      for (let i = 0; i < window.sessionStorage.length; i++) {
        sessionMap[window.sessionStorage.key(i).match(/^blackbats-(.*)$/)[1]] = window.sessionStorage.getItem(window.sessionStorage.key(i));
      }
      return sessionMap;
    }
    return null;
  },
  clear: function () {
    if (isSessionStorageSupport()) { // clear 慎用：会影响到其它使用 storage 的地方。
      window.sessionStorage.clear();
    }
  }
};

/**
 * 数组对象属性排序升序
 * @param obj1
 * @param obj2
 * @returns {number}
 */

export let arrAscendCompare = function (obj1, obj2) {
  let val1 = obj1.index;
  let val2 = obj2.index;
  if (val1 < val2) {
    return -1;
  } else if (val1 > val2) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * 去掉字符串前后空格
 * @param val 字符串
 * @returns {string} 去掉前后空格后的字符串
 */
export let trim = function (val) {
  return val.replace(/(^\s+)|(\s+$)/g, '');
};

/**
 * 返回当前日期，2017/10/11格式
 * @returns {string}
 */
export let getCurrentDate = function () {
  let date = new Date();
  let dateString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  return dateString;
};

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳(毫秒)
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
export let formatDate = function (date, fmt) {
  date = date === undefined ? new Date() : date;
  date = typeof date === 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  let obj = {
    'y': date.getFullYear(), // 年份，注意必须用getFullYear
    'M': date.getMonth() + 1, // 月份，注意是从0-11
    'd': date.getDate(), // 日期
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'w': date.getDay(), // 星期，注意是0-6
    'H': date.getHours(), // 24小时制
    'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    'm': date.getMinutes(), // 分钟
    's': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  };
  let week = ['天', '一', '二', '三', '四', '五', '六'];
  for (let i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = obj[i] + '';
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length === 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
};

export let exportFun = function (url, formItem) {
  let param = '';
  for (let field in formItem) {
    if (formItem[field]) {
      if (Array.isArray(formItem[field])) {
        formItem[field].forEach(item => {
          param += field + '[]' + '=' + item + '&';
        });
      } else {
        param += field + '=' + formItem[field] + '&';
      }
    }
  }
  param = param.substring(0, param.length - 1);
  let locationUrl = url.indexOf('?') !== -1 ? `${url}&${param}` : `${url}?${param}`;
  return locationUrl;
};

// 数组去重（数组每项为对象）
export let uniqueFun = function (arr) {
  let arrToObj = {};
  let newObj = [];
  arr.map((val, index) => {
    arrToObj[val.value] = val;
  });
  for (let name in arrToObj) {
    newObj.push(arrToObj[name]);
  }
  return newObj;
};

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
export function isEmpty(value) {
  for (var key in value) {
    if (Reflect.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * 获取本地动画开关对象setting
 * @param {string} key 动画对应的key
 * @returns {boolean}
 */
export function localSettings(key) {
  let settings = localStorage.getItem('settings') || {};
  settings = !isEmpty(settings) ? JSON.parse(settings) : {};
  return settings[key] || false;
}

/**
 * 判断值是否是undefined或null
 * @param {any} v 判断值
 * @returns {boolean}
 */
export function isUndef(v) {
  return v === undefined || v === null;
}

/**
 * 生成唯一的id值
 * @returns {string}
 */
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

/**
 * dom节点转字符串
 * @param {node} node dom节点
 * @returns {string}
 */
export function domToString(node) {
  if (!(node instanceof HTMLElement)) {
    return '';
  }
  node = node.cloneNode(true);
  let temNode = document.createElement('div');
  temNode.appendChild(node);
  const str = temNode.innerHTML;
  temNode = null;
  return str;
}

/**
 * 字符串转dom节点
 * @param {string} str 字符串
 * @returns {node}
 */
export function parseToDOM(str) {
  const div = document.createElement('div');
  if (typeof str === 'string') {
    div.innerHTML = str;
  }
  return div.childNodes[0];
}

/**
 * 检测数据类型
 * @param {*} param 检验的数据
 * @return {string} 数据类型
 * Object => Object Array => Array string => String
 * number => Number null => Null undefined => Undefined...
 */
export function getType(param) {
  return Object.prototype.toString.call(param).slice(8, -1);
}

/**
 * 深度clone
 * @param {(Object|Array)} origin 需要clone的数据源
 * @return {(Object|Array)} clone的数据
 */
export function deepClone(origin) {
  if (getType(origin) === 'Array' || getType(origin) === 'Object') {
    const json = JSON.stringify(origin);
    return JSON.parse(json);
  }
  return origin;
}

export const getKeyItems = arr => {
  return arr.reduce((acc, cur) => {
    return cur.children
      ? acc
        .concat([{id: cur.id, label: cur.label}])
        .concat(getKeyItems(cur.children))
      : [...acc, ...cur];
  }, []);
};

export default {
  getUrlParams: getUrlParams(),
  setCookie: setCookie,
  getCookie: getCookie,
  isArray: isArray,
  getPathParams: getPathParams(),
  sumDecomposePower: sumDecomposePower,
  objectToStr: objectToStr,
  objectToArr: objectToArr,
  trim: trim,
  localStorage: localStorage,
  sessionStorage: sessionStorage,
  arrAscendCompare: arrAscendCompare,
  getCurrentDate: getCurrentDate,
  formatDate: formatDate,
  exportFun: exportFun,
  uniqueFun: uniqueFun,
  isEmpty: isEmpty,
  isUndef: isUndef,
  localSettings: localSettings,
  domToString: domToString,
  parseToDOM: parseToDOM,
  guid: guid,
  getType: getType,
  deepClone: deepClone,
  getKeyItems: getKeyItems
};