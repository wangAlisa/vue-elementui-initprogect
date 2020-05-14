/**
 * immediate 是否立即执行
 * @returns fn
 */
export default function debounce(func, wait, immediate) {
  let time;
  const debounced = function() {
    const context = this;
    if (time) clearTimeout(time);

    if (immediate) {
      const callNow = !time;
      if (callNow) func.apply(context, arguments);
      time = setTimeout(() => {
        time = null;
      }, wait);
    } else {
      time = setTimeout(() => {
        func.apply(context, arguments);
      }, wait);
    }
  };

  /* debounced.cancel = function() {
    clearTimeout(time);
    time = null
  }; */

  return debounced;
}
