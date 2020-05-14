<!--
 * @Description:
 * @Author: wanglijuan01
 * @Date: 2019-10-12 14:04:32
 * @LastEditTime: 2020-05-14 09:21:58
 * @LastEditors: wanglijuan01
 -->
<template>
  <div class="b-menu" :style="{width:muw}">
    <el-menu :router="true" :default-active="currentMenu" :collapse="collapse">
      <template v-for="(item, index) in menuList">
        <el-submenu
          v-if="item.children && item.children.length > 0"
          popper-class="el-pop-submenu"
          :index="item.menuId"
          :key="index"
        >
          <template slot="title">
            <i :class="item.menuIcon"></i>
            <span style="font-size:14px;">{{ item.menuName }}</span>
          </template>
          <template>
            <el-menu-item
              v-for="(subItem, idx) in filterHide(item.children)"
              :key="`${item.menuId}-${subItem.menuId}-${idx}`"
              :route="{path: subItem.path}"
              :index="subItem.path"
            >
              {{ subItem.menuName }}
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          v-else
          :index="item.path"
          :key="index"
          style="font-size:14px;"
          :route="{path: item.path}"
        >
          <i :class="item.menuIcon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Utils from '@/common/utils';
import { MENU_LIST } from '@constans';
export default {
  data() {
    return {
      muw: '',
      menuList: MENU_LIST
    };
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isHide() {
      const { isHide = false } = this.$route.meta;
      return isHide;
    },
    currentMenu() {
      return this.path;
    }
  },
  beforeMount() {
    if (this.$route.meta.isHide) {
      const parent = this.$route.meta.parent;
      this.menuList.forEach(item => {
        item.children &&
          item.children.forEach(key => {
            if (key.menuName === parent) {
              this.path = key.path;
            }
          });
      });
    } else {
      // todo 优化路由结构
      this.path = this.$route.path;
    }
  },
  watch: {
    collapse: {
      handler(val) {
        if (!val) {
          this.muw = '160px';
        } else {
          this.muw = '';
        }
      },
      immediate: true
    },
    $route(val) {
      const { path = '' } = val;
      // 跳转目标路由为isHide为true时，不变更菜单选中状态
      let routeFromPath = Utils.sessionStorage.getItem('routeFromPath') || '';
      routeFromPath = this.isHide ? routeFromPath : path;
      Utils.sessionStorage.setItem('routeFromPath', routeFromPath);
      // this.routeCurrentPath = path;
    }
  },
  methods: {
    /**
     * 过滤隐藏页
     */
    filterHide(list) {
      return list.filter(item => !item.meta || !item.meta.isHide);
    },
    /**
     * 在导航菜单数据中书否存在所传的路由
     * @param {string} pathName 需要检测的导航链接
     * @param {Array} list 导航菜单数据
     * @return {boolean} 是否存在
     */
    isExistMenu(pathName = '', list = []) {
      if (!Array.isArray(list)) {
        return false;
      }
      return list.some(item => {
        const { children = [], route = '' } = item;
        return route === pathName ? true : this.isExistMenu(pathName, children);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.b-menu {
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  background: #fff;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  // &:not(.el-menu--collapse) {
  //   width: 160px;
  // }
}
/deep/ .el-submenu__title {
  font-size: 14px;
  .menu-icon {
    font-size: 14px;
    margin-right: 6px;
    color: #42C57A;
  }
}
/deep/ .el-submenu__title:hover {
  color: #42C57A;
  .menu-icon {
    color: #42C57A;
  }
}
</style>
