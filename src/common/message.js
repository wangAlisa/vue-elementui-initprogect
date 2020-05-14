/* eslint-disable */
import { Message,Notification, MessageBox} from 'element-ui';
import { localSettings } from '@common/utils';

// 错误震屏动画开关
const customClass = localSettings('err') ? 'message_shake_animation' : '';

// 正常显示
function info(content) {
  Message({
    showClose: true,
    message: content,
    type: 'info',
    customClass
  });
};
// 成功提示
function success(content) {
  Message({
    showClose: true,
    message: content,
    type: 'success',
    customClass
  });
};
// 警告提示，可配置持续时间，返回Message对象，可调用close方法手动关闭
function warning(content, duration = 3000) {
  return Message({
    showClose: true,
    message: content,
    duration,
    type: 'warning',
    customClass
  });
};
// 错误提示
function error(content) {
  Message({
    showClose: true,
    message: content,
    type: 'error',
    customClass
  });
};
// 正常通知
function infoNotify(title, content) {
  Notification({
    title: title,
    message: content
  });
}
// 成功通知
function successNotify(title, content) {
  Notification({
    title: title,
    message: content,
    type: 'success'
  });
}
// 错误通知
function errorNotify(title, content) {
  Notification({
    title: title,
    message: content,
    type: 'error'
  });
}
// 警告通知
function warningNotify(title, content) {
  Notification({
    title: title,
    message: content,
    type: 'warning'
  });
}
// 操作确认
function confirm(titel, content, callbackfun) {
  MessageBox.confirm(content, titel, {
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callbackfun && callbackfun();
  }).catch(() => {
    Message({
      type: 'info',
      message: '已取消'
    });
  });
}
export default {
  success,
  warning,
  error,
  info,
  successNotify,
  errorNotify,
  warningNotify,
  infoNotify,
  confirm
};