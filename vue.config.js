/*
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:08
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 10:13:39
 * @Description: 配置文件
 */
const path = require('path');
const webpack = require('webpack');
const BuildUploader = require('./src/config/buildUploader.js');
const publicPath = process.env.NODE_ENV === 'production' ? '/static/test' : '/';
const testServer = require('./src/config/testServer.js');
const { getProxy, getArgv } = require('./src/config/utils');
const testAddress = getArgv();

// 配置公共请求路径
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  outputDir: process.env.outputDir, // 将构建好的文件输出到哪里
  productionSourceMap: true, // 生产环境是否生成map文件
  lintOnSave: false,
  publicPath: publicPath,
  chainWebpack: config => {
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@common', resolve('src/common'))
      .set('@static', resolve('src/static'))
      .set('@views', resolve('src/views'))
      .set('@api', resolve('src/api'))
      .set('@router', resolve('src/router'))
      .set('@constans', resolve('src/constans'))
      .set('@utils', resolve('src/utils'))
      // .set('@mixin', resolve('src/mixin'))
      .set('@config', resolve('src/config'));
    config.resolve.extensions.values([
      '.js',
      '.vue',
      '.json',
      '.less',
      '.woff',
      '.ttf'
    ]);
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'project-title'; // 配置项目的title
        return args;
      });
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        options.name = '../fonts/[name].[hash:8].[ext]';
      });
    config.plugins.delete('prefetch');
  },
  configureWebpack: config => {
    // 打包之后可以通过buildUpload问价推送到服务器，docker环境需要跳板机部署
    if (process.env.NODE_ENV === 'production') {
      // 打包之后禁止console输出
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      if (/test|docker/.test(testAddress)) {
        config.plugins.push(
          new BuildUploader({
            receiver: testServer.receiver[testAddress],
            toPath: testServer.toPath
          })
        );
      };
    } else {
      if (/test|docker/.test(testAddress)) {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.HOST': JSON.stringify(testAddress)
          })
        );
      } else {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.HOST': JSON.stringify('easymock')
          })
        );
      }
    }
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: getProxy(testAddress), // 获取配置跨域信息
    before: app => {}
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 路径自定义
        path.resolve(__dirname, './src/static/css/color.less')
      ]
    }
  }
};
