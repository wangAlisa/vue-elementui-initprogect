/*
 * @Description: 打包编译后的上传功能
                1.创建一个命名js函数 BuildUpload
                2.在函数上 扩展 apply 方法 BuildUpload.prototype.apply
                3.指定绑定在webpack自身的事件钩子
                4.处理webpack内部实例的特定数据
                5.在函数完成时调用webpack提供的callback函数继续webpack构建流程
 * @LastEditors: wanglijuan01
 * @Date: 2019-10-08 10:55:40
 * @LastEditTime: 2020-05-13 20:04:19
 */
var fs = require('fs');
var path = require('path');
var Url = require('url');
var outputPath = '';
var checkFileType = ['.png', '.jpg', 'jpeg', '.mp3', '.mp4', '.ttf', '.eot', '.svg', '.woff'];

//1.创建一个命名js函数 
function BuildUpload(options) {
  this.options = options || {};
  if (options.status === 'push') {
    outputPath = this.options.distPath;
    directoryUpload(outputPath, this.options.receiver, this.options.toPath);
  }
}

//2.在该命名函数中定一个apply方法
BuildUpload.prototype.apply = function (compiler) {
  var _this = this;
   /**
    * 监听webpack的钩子事件,开发者向webpack的build process的不同阶段中注入自己的期望行为。
    * webpack插件的钩子事件compiler,compilation,done
    * 1.compiler 编辑开始 
    * 2.compilation 编辑开始一个新的任务 ，该阶段回调中的optimize 编译开始优化文件
    * 3.done 打包完成
    */
  compiler.plugin('done', function (stats) {
    outputPath = compiler.outputPath;
    directoryUpload(outputPath, _this.options.receiver, _this.options.toPath);
  });
};

function padStart(str, length, padStr) {
  str = '' + str;
  if (str.length < length) {
    for (var i = 0; i < length - str.length; i++) {
      str = padStr + str;
    }
  }
  return str;
}

function directoryUpload(filePath, receiver, toPath) {
  var filePath = filePath;
  var receiver = receiver;
  var toPath = toPath;
  var sep = path.sep;
  fs.readdir(filePath, function (err, files) {
    console.log(err);
    console.log(files);
    try {
      console.log(files);
    } catch (e) {
      console.log(e);
    }
    files.forEach(function (item, index) {
      var currentPath = filePath + sep + item;
      if (fs.statSync(currentPath).isFile()) {
        var outputPathSep = outputPath.split(sep);
        var pathSep = currentPath.split(sep);
        var resolvePath = pathSep.slice(outputPathSep.length).join('/');
        var fullToPath = toPath + '/' + resolvePath;
        var date = new Date();
        //判断文件类型，非文本文件不解析为字符串
        // fs.readFileSync方法在指定了encoding类型之后会返回字符串，否则返回buffer，
        if (checkFileType.indexOf(path.extname(currentPath)) !== -1) {
          var fileCon = fs.readFileSync(currentPath);
        } else {
          var fileCon = fs.readFileSync(currentPath, 'utf8');
        }
        fileUpload(
          receiver,
          {},
          {
            to: fullToPath
          },
          fileCon,
          item,
          function (res, body) {
            console.log(
              '【' +
                padStart(date.getHours(), 2, '0') +
                ':' +
                padStart(date.getMinutes(), 2, '0') +
                ':' +
                padStart(date.getSeconds(), 2, '0') +
                '】  ' +
                resolvePath +
                '>>>>' +
                fullToPath
            );
          }
        );
      } else if (fs.statSync(currentPath).isDirectory()) {
        directoryUpload(currentPath, receiver, toPath);
      }
    });
  });
}

/**
 * 遵从RFC规范的文件上传功能实现
 * @param  {String}   url      上传的url
 * @param  {Object}   opt      配置
 * @param  {Object}   data     要上传的formdata，可传null
 * @param  {String}   content  上传文件的内容
 * @param  {String}   subpath  上传文件的文件名
 * @param  {Function} callback 上传后的回调
 * @memberOf fis.util
 * @name upload
 * @function
 */
function fileUpload(url, opt, data, content, subpath, callback) {
  if (content instanceof Buffer || typeof content === 'string') {
    content = Buffer.from(content);
    // if (typeof content === 'string') {
    // }else{
    //   content = Buffer.from(content)
    // }
  } else {
    console.error('unable to upload content [%s]', typeof content);
  }
  opt = opt || {};
  data = data || {};
  var endl = '\r\n';
  var boundary = '-----np' + Math.random();
  var collect = [];
  _map(data, function (key, value) {
    collect.push('--' + boundary + endl);
    collect.push('Content-Disposition: form-data; name="' + key + '"' + endl);
    collect.push(endl);
    collect.push(value + endl);
  });
  collect.push('--' + boundary + endl);
  collect.push(
    'Content-Disposition: form-data; name="' +
      (opt.uploadField || 'file') +
      '"; filename="' +
      subpath +
      '"' +
      endl
  );
  collect.push(endl);
  collect.push(content);
  collect.push(endl);
  collect.push('--' + boundary + '--' + endl);
  var length = 0;
  collect.forEach(function (ele) {
    if (typeof ele === 'string') {
      length += Buffer.byteLength(ele, 'utf8');
    } else {
      length += ele.length;
    }
  });

  opt.method = opt.method || 'POST';
  opt.headers = Object.assign(
    {
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Content-Length': length
    },
    opt.headers || {}
  );
  opt = _parseUrl(url, opt);
  var http = opt.protocol === 'https:' ? require('https') : require('http');
  var req = http.request(opt, function (res) {
    var status = res.statusCode;
    console.log(status);
    var body = '';
    res
      .on('data', function (chunk) {
        body += chunk;
        // console.log(body);
      })
      .on('end', function () {
        if ((status >= 200 && status < 300) || status === 304) {
          callback(null, body);
        } else {
          callback(status);
        }
      })
      .on('error', function (err) {
        callback(err.message || err);
      });
  });
  collect.forEach(function (d) {
    req.write(d);
  });
  req.end();
}
/**
 * 对象枚举元素遍历，若merge为true则进行_.assign(obj, callback)，若为false则回调元素的key value index
 * @param  {Object}   obj      源对象
 * @param  {Function|Object} callback 回调函数|目标对象
 * @param  {Boolean}   merge    是否为对象赋值模式
 * @memberOf fis.util
 * @name map
 * @function
 */
function _map(obj, callback, merge) {
  var index = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (merge) {
        callback[key] = obj[key];
      } else if (callback(key, obj[key], index++)) {
        break;
      }
    }
  }
}
/**
 * url解析函数，规则类似require('url').parse
 * @param  {String} url 待解析的url
 * @param  {Object} opt 解析配置参数 { host|hostname, port, path, method, agent }
 * @return {Object}     { protocol, host, port, path, method, agent }
 * @memberOf fis.util
 * @name parseUrl
 * @function
 */
function _parseUrl(url, opt) {
  opt = opt || {};
  url = Url.parse(url);
  var ssl = url.protocol === 'https:';
  opt.host =
    opt.host ||
    opt.hostname ||
    (ssl || url.protocol === 'http:' ? url.hostname : 'localhost');
  opt.port = opt.port || (url.port || (ssl ? 443 : 80));
  opt.path = opt.path || url.pathname + (url.search ? url.search : '');
  opt.method = opt.method || 'GET';
  opt.agent = opt.agent || false;
  return opt;
}

module.exports = BuildUpload;
