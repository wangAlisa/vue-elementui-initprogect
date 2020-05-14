/*
 *
 *
 * @example
 *
 * @params
 *  url: string类型  要跳转的链接
 *  target：_blank,在新窗口中打开被链接文档    _self:默认,在相同的框架中打开被链接文档
    this.$openWindow(url,target);
 *
 */

const openWindow = (url, target) => {
  let a = document.createElement('a');
  a.href = url;
  a.target = target || '_blank';
  a.click();
  a = null;
};

export default openWindow;
