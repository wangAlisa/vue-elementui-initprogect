<template>
  <div class="h-top-bar">
    <div class="logo icon" @click="goHome"></div>
    <div v-if="!hideMenu" class="fold-icon icon" @click="foldClick"></div>
    <div class="h-top-content">
      <div class="h-user">
        <div class="avatar"></div>
        <span class="uname">{{uname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { localStorage } from '@/common/utils';
export default {
  name: 'header',
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    hideMenu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      uname: '张三'
    };
  },
  methods: {
    /**
     * 导航栏小化和恢复操作
     */
    foldClick() {
      const { collapse } = this;
      this.$emit('update:collapse', !collapse);
    },
    /**
     * 退出登录
     * 清空session
     */
    logout() {
      this.$service.get('logOut', '').then(res => {
        localStorage.clear();
      });
    },
    goHome() {
      localStorage.clear();
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="less" scoped>
.icon {
  background-repeat: no-repeat;
  background-position: center;
}

.h-top-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid grey;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 9;
  /deep/.el-tabs__item {
    height: 50px;
  }
}

.logo {
  height: 50px;
  width: 160px;
  background-color: #42C57A;
  background-image: url(../../static/images/logo_bg.png);
  background-size: 105px 38px;
  transition: width 0.3s ease-in-out;
}

.fold-icon {
  height: 28px;
  width: 28px;
  background-image: url(../../static/images/ic_topbar_fold_normal.svg);
  background-size: 28px 28px;
  cursor: pointer;
  margin-left: 16px;

  &:hover {
    background-image: url(../../static/images/ic_topbar_fold_hover.svg);
  }
}

.h-top-content {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  .select-app {
    line-height: 50px;
  }
  .h-user {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 16px;
    min-width: 100px;

    &:hover {
      .avatar-icon {
        color: #42C57A;
        transform: rotateZ(180deg);
      }

      .cover {
        display: block;
        color: #42C57A;
        box-shadow: 0 2px 12px 0 hsla(225, 5%, 54%, 0.2);
      }
    }

    .avatar {
      height: 24px;
      width: 24px;
      vertical-align: middle;
      margin: 0 6px;
      border-radius: 50%;
    }

    .uname {
      font-size: 12px;
      color: #42C57A;
    }

    .avatar-icon {
      margin-left: 10px;
      font-size: 12px;
      color: grey;
      transform-origin: center;
      transition: color 0.3s, transform 0.3s;
    }

    .cover {
      display: none;
      position: absolute;
      background-color: #ffffff;
      right: 0;
      top: 40px;
      height: 30px;
      width: 88px;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
    }
  }
}

.top-hot-area {
  font-size: 0;
  a.top-hot-area-title {
    display: inline-block;
    position: relative;
    font-size: 14px;
    height: 100%;
    padding: 0 12px;
    line-height: 50px;
    vertical-align: middle;
    text-decoration: none;
    outline: none;
    color: #333;
    overflow: hidden;
    margin-right: 20px;
    &:after {
      -webkit-transition: 0.2s;
      transition: 0.2s;
      content: '';
      position: absolute;
      left: 0;
      bottom: -4px;
      display: block;
      width: 100%;
      height: 4px;
      background: #61ca74;
    }
    &:hover {
      &:after {
        bottom: 0;
      }
    }
  }
}
</style>
