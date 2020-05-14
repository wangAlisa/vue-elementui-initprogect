<!--
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:43
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-04 12:39:56
 * @Description: readme
 -->
# init-project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
## mock数据
```
yarn serve
```
## docker/test环境接口
```
npm run dev 服务器名称 eg:npm run dev juzi-docker/npm run dev test296
```

### Compiles and minifies for production
```
yarn build
```
## 推送代码到测试服务器
```
yarn push --config 服务器名称 eg:yarn push --config test296
```
## 打包推送代码到测试服务器
```
yarn build --config 服务器名称 eg:yarn build --config test296
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 接口请求service
1. get示例

```
this.$service.get(ReportApi.courselist, params)
    .then(res => {
        console.log(res);
      });
    },
```

2. post示例

```
 this.$service.post(API.getEntityBasicData, params)
    .then(res => {
        console.log(res)
    });
```
3. 特殊情况
> 请求数据不做任何效验直接返回
> 多传递一个参数 0 或者 true

```
this.$service.get(ReportApi.courselist, params,true)
    .then(res => {
        console.log(res);
      });
    },
```
