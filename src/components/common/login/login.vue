<!--
 * @Author: wanglijuan01
 * @Date: 2019-11-04 09:52:20
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-13 23:45:29
 * @Description: 开发环境中cookie
 -->
<template>
  <div class="login">
    <el-card class="login-card">
      <el-form label-width="80px" class="login-form">
        <el-form-item label="uuap">
          <el-input type="text" v-model="loginForm.buss" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="login('loginForm')">设置cookie</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import router from '@/router/index';
import util from '@/common/utils';
import Message from '@common/message';
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        buss: ''
      }
    };
  },
  methods: {
    login(formName) {
      const buss = util.trim(this.loginForm.buss);
      if (!buss) {
        Message.warning('buss不能为空~');
        return;
      }
      util.setCookie('uuap', buss);
      router.push({ name: 'home' });
    }
  }
};
</script>
<style lang="less" scoped>
  .login {
    &-card {
      width: 450px;
      margin: 200px auto;
      &-form {
        width: 330px;
        margin: auto;
        margin-top: 50px;
      }
    }
  }
</style>
