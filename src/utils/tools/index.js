/* eslint-disable */
/*
 *@fileoverview  序号补全0
 *@param index
 */
function prependZero(index) {
  return index < 10 ? `0${index}` : index;
}

/**
 * @description 获取时间差值
 * @param {Number} startTime  开始时间毫秒数 例如：1532058935719
 * @param {Number} endTime   结束时间毫秒数  例如：1532058935719
 * @param {String} diffType  类型：second,minute,hour,day
 */
function getDateDiff(startTime, endTime, diffType) {
  // 将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  const sTime = startTime ? new Date(startTime) : new Date(); // 开始时间
  const eTime = endTime ? new Date(endTime) : new Date(); // 结束时间

  // 作为除数的数字
  let timeType = 1;
  switch (diffType) {
    case 'second':
      timeType = 1000;
      break;
    case 'minute':
      timeType = 1000 * 60;
      break;
    case 'hour':
      timeType = 1000 * 3600;
      break;
    case 'day':
      timeType = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt(
    (eTime.getTime() - sTime.getTime()) / parseInt(timeType, 10),
    10
  );
}

/**
 * @description 根据传入的时间戳判断是不是今天
 * @param {Number} time  时间毫秒数 例如：1532058935719
 */
function isToday(time) {
  const today = new Date();
  const day = new Date(time);

  return (
    today.getFullYear() === day.getFullYear() &&
    today.getMonth() === day.getMonth() &&
    today.getDate() === day.getDate()
  );
}

/**
 * @description 对象（含数组）遍历
 * @param  {Object}   elements 将要遍历的对象
 * @param  {Function} callback 对象中针对每个元素的回调函数
 * @return {Object}
 */
function each(elements, callback) {
  if (typeof elements.length === 'number') {
    for (let i = 0; i < elements.length; i++) {
      if (callback.call(elements[i], i, elements[i]) === false) {
        return elements;
      }
    }
  } else {
    for (const key in elements) {
      if (callback.call(elements[key], key, elements[key]) === false) {
        return elements;
      }
    }
  }

  return elements;
}

/**
 * @description 判断数据类型
 * @param  {Object} obj 未知数据
 * @return {String}     数据的类型
 */
function type(obj) {
  const class2type = {};
  const typeList = [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Object',
    'Error'
  ];

  each(typeList, (i, name) => {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });

  return obj == null
    ? String(obj)
    : class2type[Object.prototype.toString.call(obj)] || 'object';
}

/**
 * @description 判断是否是纯对象
 * @param  {Object}  obj
 * @return {Boolean}     判断结果
 */
function isPlainObject(obj) {
  return (
    type(obj) === 'object' &&
    (obj == null || obj !== obj.window) && // 不是window对象
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

/**
 * @description 判断是否是空对象
 * @param  {[type]}  obj
 * @return {Boolean}     判断结果
 */
function isEmptyObject(obj) {
  for (const name in obj) {
    return false;
  }

  return true;
}

/**
 * @description 将json对象(plain object)转换为可用于 url query 编码的字符串
 * @param  {Object}  json          json对象
 * @param  {Boolean} shouldEncode  指示是否对value部分进行encodeURIComponent编码【可选】
 * @return {String}
 */
function jsonToQuery(json, shouldEncode) {
  shouldEncode = typeof shouldEncode === 'boolean' ? shouldEncode : true;

  function getQuery(key, val) {
    let _query;

    switch (type(val)) {
      case 'boolean':
      case 'number':
      case 'string':
        _query = key + '=' + (shouldEncode ? encodeURIComponent(val) : val);
        break;
      case 'regexp':
        _query =
          key +
          '=' +
          (shouldEncode ? encodeURIComponent(val.source) : val.source);
        break;
      case 'date':
        _query = key + '=' + val.getTime();
        break;
      case 'array':
        _query = [];
        for (let i = 0; i < val.length; ++i) {
          if (/^boolean|number|string|regexp|date$/.test(type(val[i]))) {
            _query.push(arguments.callee(key, val[i]));
          }
        }
        break;
      default:
        _query = undefined;
    }

    return _query;
  }

  var queries = [];
  if (type(json) === 'object' && isPlainObject(json)) {
    each(json, function(key, val) {
      var query = getQuery(key, val);
      query && (queries = queries.concat(query));
    });
  }

  return queries.join('&');
}

/**
 * @description 将编码在 url query 中的数据转换成 json 格式
 * @param  {String}  url          url或其 query部分
 * @param  {Boolean} shouldDecode 指示是否对 query 部分进行 decodeURIComponent 解码
 * @return {Object}               编码成 json 格式的数据
 */
function queryToJson(url, shouldDecode) {
  url = (url || window.location.href.replace(window.location.hash, '')) + '';
  shouldDecode = typeof shouldDecode === 'boolean' ? shouldDecode : true;

  const qJson = {},
    qList = url.substr(url.lastIndexOf('?') + 1).split('&');

  function getQueryValue(val) {
    let _val = val;

    if (shouldDecode) {
      try {
        _val = decodeURIComponent(val);
      } catch (ex) {}
    }

    return _val;
  }

  for (let i = 0; i < qList.length; ++i) {
    if (qList[i]) {
      var _query = qList[i].split('=');
      if (_query.length > 1) {
        const _key = _query[0],
          _val = _query[1];

        if (qJson[_key] === undefined) {
          qJson[_key] = getQueryValue(_val);
        } else {
          if (type(qJson[_key]) !== 'array') {
            qJson[_key] = [qJson[_key]];
          }
          qJson[_key].push(getQueryValue(_val));
        }
      }
    }
  }

  return qJson;
}

/* 返回方法 */
export default {
  prependZero,
  getDateDiff,
  isToday,
  each,
  type,
  isPlainObject,
  isEmptyObject,
  jsonToQuery,
  queryToJson
};
