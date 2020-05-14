<!--
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:08
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:42:33
 * @Description: vue入口文件
 -->
<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {
    this.queryAuthority();
    window.onresize = this.$throttle(() => {
      console.log('resize');
    }, 300);
  },
  methods: {
    /**
     * 检测登录权限
     */
    queryAuthority() {
      this.$service.get('getLoginAuthority').then(res => {
        //  处理内容
      });
    }
  }
};
</script>
<style lang="less">

</style>
