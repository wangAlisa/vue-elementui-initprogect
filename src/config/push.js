/*
 * @Author: wanglijuan01
 * @Date: 2019-11-05 11:31:01
 * @LastEditTime: 2020-03-01 11:33:01
 * @LastEditors: wanglijuan01
 * @Description: In User Settings Edit
 * @FilePath: 
 */
'use strict';
process.env.NODE_ENV = 'production';
const path = require('path');
const BuildUploader = require('./buildUploader');
const testServer = require('./testServer.js');
const { getArgv } = require('./utils.js'); // 测试服务器

const testAddress = getArgv();

new BuildUploader({
  receiver: testServer.receiver[testAddress],
  toPath: testServer.toPath,
  status: 'push',
  distPath: path.resolve(__dirname, '../../dist')
});
