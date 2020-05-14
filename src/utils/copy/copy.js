/*
 * @Description: 复制
 * @Author: --
 * @LastEditors: Ask
 * @Date: 2019-04-25 17:38:03
 * @LastEditTime: 2019-07-04 17:43:38
 */
import Vue from 'vue';
import Clipboard from 'clipboard';

function clipboardSuccess() {
  console.log('success');
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success',
    duration: 1500
  });
}

function clipboardError() {
  console.log('error');
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error'
  });
}
/**
 * @Description: 复制执行
 * @param {string}
 * @param {event}
 * @return: null
 * @demo: this.$copy('dfghjk', e)
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  });
  clipboard.on('success', () => {
    clipboardSuccess();
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    clipboardError();
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
