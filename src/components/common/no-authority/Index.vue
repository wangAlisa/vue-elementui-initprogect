<template>
  <div class="no-authority">
    <div class="no-authority-content">
      <img src="@/static/images/no-authority.svg" alt=""/>
      <p>你还没有访问权限</p>
      <p>请联系管理员</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'no-authority'
};
</script>
<style lang="less" scoped>
  .no-authority {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(~'100vh - 130px');
    &-content {
      text-align: center;
      p {
        line-height: 20px;
        font-size: 14px;
        color: #969799;
      }
    }
  }
</style>
