/*
 * @Author: wanglijuan01
 * @Date: 2019-11-06 14:16:03
 * @LastEditTime: 2020-05-13 20:06:29
 * @LastEditors: wanglijuan01
 * @Description: In User Settings Edit
 */

// 生成通用的测试服务器地址
function getProxy(testAddress) {
  let _proxy;
  if (process.env.NODE_ENV !== 'production') {
    if (/test/.test(testAddress) || /docker/.test(testAddress)) {
      _proxy = {
        '/testAddress': {
          target: 'http://' + testAddress + '.cc.com', // 源地址
          changeOrigin: true, // 改变源
          ws: true,
          pathRewrite: {
            '^/testAddress': 'http://' + testAddress + '.cc.com' // 路径重写
          }
        }
      };
    }
  }
  return _proxy;
}
function getArgv() {
  let argv;
  try {
    argv = JSON.parse(process.env.npm_config_argv).original;
  } catch (e) {
    argv = process.argv;
  }
  if (argv) {
    return argv
      .toString()
      .split(',')
      .pop();
  }
}

module.exports = {
  getArgv,
  getProxy
};