/* eslint-disable no-extend-native */
/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-09 19:32:42
 * @LastEditTime: 2019-10-09 19:37:51
 */
/*
  给Date对象添加日期格式化方法（2018-2-2）
  示例
    var time1 = new Date('2019/12/19').Format("YYYY-MM-DD");
  var time2 = new Date(1517553344000).Format("YYYY-MM-DD hh:mm:ss q");
*/
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'D+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    S: this.getMilliseconds(), // 毫秒
    'q+': Math.floor((this.getMonth() + 3) / 3) // 季度
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
