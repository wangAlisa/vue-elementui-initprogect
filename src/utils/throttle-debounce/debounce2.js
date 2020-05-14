/** 调用
 *  assignTaskFn:function(){
 *         this.assignTask.$debounce(1000,this)
 *      },
 */
Function.prototype.$debounce = function (wait, currThis, ...values) {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  var params = values || [];
  /* 当前this指Function实例 => 即当前要防抖的方法 */
  if (!this.timer) this.apply(currThis, params);
  this.timer = setTimeout(() => {
    this.timer = null;
  }, wait || 500);
};
