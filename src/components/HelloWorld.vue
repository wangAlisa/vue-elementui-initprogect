<!--
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:08
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:40:36
 * @Description: 使用示例
 -->
<template>
  <div class="hello">
    <div>项目说明</div>
    <p>项目是以vue cli3.0、elementui、less搭建的项目</p>
    <div>使用说明</div>
    <div>src目录文件说明</div>
    <p>├── api #接口 </p>
    <p>├── common #公共方法（拖拽排序功能插件、toast/message提示、MD5、常用的方法（localStorage等）、以及常用静态数据） </p>
    <p>├── components #公共组件  src/components/common文件说明: page(页面布局组件)、actionbtn(操作按钮)、</p>
        <p style="margin-left:30px;">page-common(分页)、search-box(搜索组件)、upload(上传组件),使用方式参照table页和form页</p>
    <p>├── config #前端服务域名、请求接口函数、代码远端推送等相关的配置</p>
    <p>├── constans #左侧菜单配置的静态数据，以及项目全局使用的静态数据 </p>
    <p>├── router #前端路由</p>
    <p>├── static #前端静态文件,css文件包括重置和公共样式、颜色等</p>
    <p>├── utils: #工具函数</p>
    <p>├── views: #案例页面组件，多form表单的的校验，table表格的搜索分页, 文本编辑器</p>
    <p>├── build.sh #线上代码安装依赖、打包编译脚本 </p>
    <p>├── 其他：# 配置文件</p>
    <div><router-link :to="{path: '/layout/table'}">进入体验</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  text-align: left;
  padding:20px 50px 50px 200px;
  div{
    font-size:16px;
    line-height:32px;
    color:#42b983;
  }
  p{
    line-height:24px;
    font-size:14px;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  padding:10px;
  font-size:16px;
  margin:20px;
}
</style>
