/*
 * @Author: wanglijuan01
 * @Date: 2020-02-29 15:38:50
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-13 23:43:41
 * @Description: toast提示
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
let toast = function (obj, _this) {
  // style, type, content, title, successFun, errorFun
  switch (obj.style) {
    case 'message':
      return _this.$message({
        message: obj.content,
        type: obj.type,
        showClose: true
      });
    case 'alert':
      return _this.$alert(obj.content, obj.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          // 操作
          obj.successFun && obj.successFun();
        }
      });
    case 'confirm':
      return _this.$confirm(obj.content, obj.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: obj.type
      }).then(() => {
        obj.successFun && obj.successFun();
      }).catch(() => {
        obj.errorFun && obj.errorFun();
      });
    case 'notify':
      return _this.$notify({
        title: obj.title,
        message: obj.content,
        type: obj.type,
        showClose: true
      });
  }
};

export default {
  toast: toast
};
