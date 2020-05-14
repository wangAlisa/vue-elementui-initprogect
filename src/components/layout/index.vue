<!--
 * @Description: This is a description
 * @Author: wanglijuan01
 * @LastEditors: wanglijuan01
 * @Date: 2019-10-08 10:56:19
 * @LastEditTime: 2020-05-14 09:17:38
 -->
<template>
  <div :class="['el-layout', {fold: collapse}]">
    <b-header
      v-if="!hideWrap"
      :collapse.sync="collapse"
      :hideMenu="hideMenu"
    />
    <b-menu v-if="!hideMenu && !hideWrap" :collapse.sync="collapse"/>
    <div :class="['layout-grid', {'hide-menu': hideMenu}, {'hide-wrap': hideWrap}]">
      <slot></slot>
      <div style="height:auto" v-watermask="waterMark"></div>
    </div>
  </div>
</template>

<script>
import bHeader from './header';
import bMenu from './menu';
export default {
  name: 'layout',
  props: {
    showLogo: {
      type: Boolean,
      default: true
    },
    hideMenu: {
      type: Boolean,
      default: false
    },
    hideWrap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collapse: false,
      waterMark: {
        text: {
          userName: '管理员',
          currentDate: new Date().toLocaleString()
        },
        opacity: 0.08 // 水印的透明度 默认0.15,选填
      }
    };
  },
  created() {
  },
  components: {
    bHeader,
    bMenu
  },
  beforeMount() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.el-layout {
  height: 100%;
  .layout-grid {
    padding: 56px 16px 16px 176px;
    box-sizing: border-box;
    height: 100%;
    border-radius: 2px;
    box-sizing: border-box;
    transition: padding-left 0.3s ease-in-out;
    position: relative;
    &.hide-menu {
      padding-left: 0;
    }
    &.hide-wrap {
      // margin: 0;
      padding-left: 0;
    }
  }

  &.fold {
    // main
    .layout-grid {
      padding-left: 66px;
      transition: padding-left 0.3s ease-in-out;
      position: relative;
    }
  }
}
</style>
