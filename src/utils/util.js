/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-09 19:32:42
 * @LastEditTime: 2019-12-13 12:00:46
 */
/**
 * Check if value is primitive.
 */
export function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}

// 判断是undefined
export function isUndef(v) {
  return v === undefined || v === null;
}

// deepClone
export function deepClone(data) {
  if (data === null) return data;
  let temp;
  if (typeof data === 'object') {
    temp = Array.isArray(data) ? [] : {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object') {
          temp[key] = deepClone(data[key]);
        } else {
          temp[key] = data[key];
        }
      }
    }
  } else {
    return data;
  }
  return temp;
}

/**
 * @Description: 实现rgb到Hex的转换
 * @param {String} eg: rgb(1,2,3)
 * @return: String eg: #125633
 * TODO: rgba
 */
export function rgbToHex(rgb) {
  if (!/^rgb/.test(rgb)) {
    throw Error('[arguments error] 参数必须以rgb开头');
    return;
  }
  rgb = rgb.replace(/\s/g, '');
  let arr = rgb.match(/(\d+)/g);
  let res = '#';
  return arr.reduce((prev, cur) => {
    return (res += parseInt(cur).toString(16));
  }, 0);
}

// 校验邮箱格式函数
export const checkEmail = (value) => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(value);
};
// 校验手机号函数
export const validatorCheckPhone = (rule, value, callback) => {
  const reg = /^(1[0-9])\d{9}$/;
  if (reg.test(value) || value === "") {
    callback();
  } else {
    callback("手机号格式错误！");
  }
};
// 校验邮箱格式函数
export const validatorCheckEmail = (rule, value, callback) => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback("邮箱格式错误！");
  }
};
// 校验身份证函数
const validatorCheckIdCard = (rule, value, callback) => {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback("身份证号格式错误！");
  }
};
// 校验仅支持中文和数字函数
const validatorCheckChinese = (rule, value, callback) => {
  const reg = /^[0-9\u4e00-\u9fa5]+$/gi;
  if (reg.test(value)) {
    callback();
  } else {
    callback("该项只支持中文及数字");
  }
};
// 计算时间差
export const getDateDiff = (startDate,endDate) => {  
  let startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
  let endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
  let dates = Math.floor((startTime - endTime)) / (1000*60*60*24);     
  return dates;
};