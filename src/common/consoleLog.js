/* eslint-disable */
// 统一console.log()效果，并加开关
const log = {};

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor(type = 'default') {
  let color = '';
  switch (type) {
    case 'default': color = '#35495E'; break;
    case 'primary': color = '#3488ff'; break;
    case 'success': color = '#43B883'; break;
    case 'warning': color = '#e6a23c'; break;
    case 'danger': color = '#f56c6c'; break;
    default:; break;
  }
  return color;
};

/**
 * @description 打印彩色文字
 */
log.colorful = function (textArr) {
  if (process.env.VUE_APP_CONSOLELOG === 'on') {
    let currentDate = '[' + new Date().toLocaleString() + '] ';
    console.log_ = console.log;
    console.log_(
      `%c${textArr.map(t => currentDate + ' ' + t.text || '').join('%c')}`,
      ...textArr.map(t => `color: ${typeColor(t.type)};`)
    );
  } else {
    return false;
  }
};

log.default = function (text) {
  log.colorful([{ text }]);
};

log.primary = function (text) {
  log.colorful([{ text, type: 'primary' }]);
};

log.success = function (text) {
  log.colorful([{ text, type: 'success' }]);
};

log.warning = function (text) {
  log.colorful([{ text, type: 'warning' }]);
};

log.danger = function (text) {
  log.colorful([{ text, type: 'danger' }]);
};

const group = function (label) {
  if (process.env.VUE_APP_CONSOLELOG === 'on') {
    console.group_ = console.group;
    console.group_(label);
  } else {
    return false;
  }
};

const groupEnd = function () {
  if (process.env.VUE_APP_CONSOLELOG === 'on') {
    console.groupEnd_ = console.groupEnd;
    console.groupEnd_();
  } else {
    return false;
  }
};

export {
  log,
  group,
  groupEnd
};
