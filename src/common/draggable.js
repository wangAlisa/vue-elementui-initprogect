/*
 * @Author: tanghaichuan
 * @Date: 2018-10-31 10:46:47
 * @Last Modified by: tanghaichuan
 * @Last Modified time: 2019-01-18 15:29:37
 * @Description: 拖拽排序功能插件
 */
/* eslint-disable */
const noop = _ => {};

export class Draggable {
  constructor(el = '', options = {}) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      return false;
    }

    // 解析options参数，防止浅拷贝
    this.options = options = this._extend({}, options);

    this._childrenEl = el && el.children;

    if (!(this._childrenEl && this._childrenEl.length)) {
      return false;
    }

    this._init();
  }

  // 实例化Draggable
  static create(el, options) {
    return new Draggable(el, options);
  }

  dragstart = (e) => {
    const index = e.target.getAttribute('data-index');
    e.dataTransfer.setData('from', index);
    this.options.dragstart(e, index);
  }

  dragover=(e) => {
    e.preventDefault();
  }

  drop=(e) => {
    e.preventDefault();
    const from = e.dataTransfer.getData('from');
    const path = e.path;
    let to;
    path.forEach(item => {
      if (item.getAttribute) {
        let index = item.getAttribute('data-index');
        if (index) {
          to = index;
          return false;
        }
      }
    });
    this.options.drop(from, to);
  }

  _init() {
    for (const key in this._childrenEl) {
      if (this._childrenEl[key].setAttribute && this._childrenEl[key].getAttribute) {
        let isDraggable = this._childrenEl[key].getAttribute('draggable');
        if (!isDraggable) {
          this._childrenEl[key].setAttribute('draggable', 'true');
          this._childrenEl[key].setAttribute('data-index', key);

          // 绑定监听事件
          this._childrenEl[key].addEventListener('dragover', this.dragover, false);
          this._childrenEl[key].addEventListener('dragstart', this.dragstart, false);
          this._childrenEl[key].addEventListener('drop', this.drop, false);
        }
      }
    }
  }

  // 拷贝options挂载属性
  _extend(target, source) {
    const defaultOps = {
      dragstart: noop,
      drop: noop
    };
    if (target && source) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return Object.assign(defaultOps, target);
  }

  // 基础节点拖拽事件监听
  remove() {
    for (const key in this._childrenEl) {
      if (this._childrenEl[key].removeAttribute) {
        this._childrenEl[key].removeAttribute('draggable');
        this._childrenEl[key].removeAttribute('data-index');
        // 移除监听事件
        this._childrenEl[key].removeEventListener('dragover', this.dragover, false);
        this._childrenEl[key].removeEventListener('dragstart', this.dragstart, false);
        this._childrenEl[key].removeEventListener('drop', this.drop, false);
      }
    }
  }
}

export default Draggable;