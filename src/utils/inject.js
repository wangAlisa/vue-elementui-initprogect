/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: wanglijuan01
 * @Date: 2019-10-09 19:32:42
 * @LastEditTime: 2020-03-01 14:08:29
 */
// 打点
// 日期格式化
import './date/formatDate.js';
// api
// 去抖，节流
import debounce from './throttle-debounce/debounce';
import throttle from './throttle-debounce/throttle';
import copy from './copy/copy';
import eventBus from './eventBus/eventBus';
import download from './download/download';
import downloadUrl from './download/downloadUrl';
import openWindow from './openWindow/openWindow';

export default {
  install(vm) {
    vm.prototype.$debounce = debounce;
    vm.prototype.$throttle = throttle;
    vm.prototype.$bus = eventBus;
    vm.prototype.$copy = copy;
    vm.prototype.$downloadUrl = downloadUrl;
    vm.prototype.$download = download; // 加强版本
    vm.prototype.$openWindow = openWindow;
    vm.prototype.$toast = function (msg) {
      this.$message({
        iconClass: 'no-icon',
        message: msg,
        customClass: 'self-toast'
      });
    };
  }
};
