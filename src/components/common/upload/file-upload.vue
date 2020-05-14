<!--
 * @Author: zhangjian01
 * @Date: 2018-11-29 16:48:44
 * @LastEditors: wanglijuan01
 * @Description: 上传文件组件
 * @params fileLimitObj:限制条件type:支持的类型，size:大小
           fileConfig:配置参数label：组件标题，action：上传的地址，data:接口参数，name:上传的文件名称，uploadTips:提示语，
           filePid:文件id, fileName：文件的名字，fileUrl:文件的地址,
 * @Function: uploadSuccess 成功时候的回调
 * @type:传了type则显示button按钮
 -->
<template>
  <div class="upload-file-container">
    <span class="upload-file-container-label" v-if="fileConfig.label">{{fileConfig.label}}</span>
    <div class="upload-file-container-upload">
      <div class="upload-file-container-item">
        <el-upload
          ref="uploadImg"
          v-if="!uploadDisabled"
          :action="filConfig.action"
          :data="filConfig.data"
          :name="filConfig.name"
          :show-file-list="false"
          :disabled="loading"
          :on-success="handleFileUploadSuccess"
          :on-error="pushError"
          :before-upload="beforeFileUpload"
          :multiple="false">
          <el-button v-if="btnType" size="medium" type="primary">上传文件</el-button>
          <div  v-if="!uploadDisabled && !btnType" class="file-uploader">
            <i v-if="!loading" class="el-icon-plus file-uploader-icon"></i>
            <div v-loading="loading" element-loading-size="40px" class="file-uploader-loading"></div>
          </div>
        </el-upload>
        <div v-if="uploadDisabled" class="show-file">
          <span class="filename" v-if="fileName">
            <i class="el-icon-document"></i>
            {{ fileName }}
          </span>
          <p class="show-file-change">
            <i class="el-icon-delete el-icon-refresh" @click="handleFileDelete"></i>
          </p>
        </div>
        <div v-if="filConfig.uploadTips" slot="tips" class="upload-file-container-item-tip">
          {{ filConfig.uploadTips }}
        </div>
        <div v-else slot="tip" class="upload-file-container-item-tip"> {{ handleFileTip }}</div>
      </div>
    </div>
  </div>
</template>
<script>
const actions = {
  local: '/testAddress/wxadmin/api/uploadimg',
  test: '/wxadmin/api/uploadimg',
  server: '/wxadmin/api/uploadimg'
};
export default {
  name: 'templateUpload',
  props: {
    fileLimit: {
      type: Object,
      default: () => {
        return {
          type: 'pdf,doc',
          size: 2
        };
      }
    },
    fileConfig: {
      type: Object,
      default: () => {
        return {
          fileUrl: '',
          fileName: '',
          action: this.computedEnv()
        };
      }
    }
  },
  watch: {
    'fileConfig.fileUrl': {
      handler(newUrl, oldUrl) {
        this.currentFileUrl = newUrl;
        this.uploadDisabled = !!newUrl; // 是否禁止上传
      },
      immediate: true
    }
  },
  data() {
    return {
      btnType: this.type,
      currentFileUrl: this.fileConfig.fileUrl,
      uploadDisabled: !!this.fileConfig.fileUrl, // 是否禁止上传
      fileName: this.fileConfig.fileName,
      loading: false,
      filConfig: {
        fileUrl: '',
        fileName: '',
        action: ''
      }
    };
  },
  mounted() {
    this.filConfig = Object.assign(this.filConfig, this.fileConfig);
  },
  computed: {
    handleFileTip() {
      let tips = '';
      if (!this.fileLimit) {
        return;
      }
      if (this.fileLimit.type) {
        tips += `文件只支持上传${this.fileLimit.type}格式`;
      }
      if (this.fileLimit.size) {
        if (this.fileLimit.type) {
          tips += '，';
        }
        tips += `文件大小不超过${this.showSize}`;
      }
      return tips;
    },
    // 处理文件tip
    showSize() {
      const fileSize = this.fileLimit.size;
      return fileSize < 1 ? fileSize * 1000 + 'KB !' : fileSize + 'M !';
    }
  },
  methods: {
    // 判断文件尺寸和类型
    beforeFileUpload(file) {
      const fileLimitObj = this.fileLimit;
      if (
        fileLimitObj.type
          .toLowerCase()
          .indexOf(file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()) === -1
      ) {
        this.$message.error(`文件只能是${fileLimitObj.type}格式!`);
        return false;
      }
      if (file.size / 1024 / 1024 >= fileLimitObj.size) {
        this.$message.error('文件过大，请调整文件大小');
        return false;
      }
      this.loading = true;
    },
    // 文件上传成功回调
    handleFileUploadSuccess(res, file, fileList) {
      this.loading = false;
      if (res.errNo) {
        this.$message.error(res.errstr);
        return;
      }
      // eslint-disable-next-line no-unused-expressions
      this.fileName = file.name;
      this.uploadDisabled = true;
      this.$emit('uploadSuccess', Object.assign({}, file, res.data));
      this.$message({ message: '上传成功！', type: 'success' });
    },
    // 删除文件
    handleFileDelete() {
      this.currentFileUrl = '';
      this.fileName = '';
      this.uploadDisabled = false;
      this.$emit('uploadSuccess', {});
    },
    // 上传文件失败
    pushError(res, file) {
      this.loading = false;
      this.$message({ message: '上传失败！', type: 'error' });
    },
    computedEnv() {
      const hostName = location.hostname;
      let url = '';
      if (/^localhost$/gi.test(hostName)) {
        url = actions.local;
      } else if (/docker|test/gi.test(hostName)) {
        url = actions.test;
      } else {
        url = actions.server;
      }
      return url;
    }
  }
};
</script>
<style lang="less" scoped>
.upload-file-container {
  align-items: center;
  display: flex;
  box-sizing: border-box;
  &-label {
    width: 83px;
    padding-left: 30px;
    // font-weight: bold;
    color: #757678;
    &::before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  &-upload {
    display: flex;
  }
  &-item {
    line-height: 0;
    &-tip {
      font-size: 12px;
      line-height: 20px;
    }
    &-filename {
      margin-left: 20px;
    }
  }
  .file-uploader {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    height: 120px;
    width: 120px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    box-sizing: border-box;
    &:hover {
      border-color: #409eff;
    }
    &-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    &-loading {
      color: #8c939d;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      /deep/.el-loading-spinner {
        margin-top: 20px;
        margin-left: 40px;
      }
    }
    .file {
      width: 120px;
      height: 120px;
      display: block;
      object-fit: contain;
    }
  }
  .show-file {
    display: flex;
    margin-bottom: 8px;
    padding: 2px;
    height: 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    box-sizing: border-box;
    background: #d9d9d9;
    .filename {
      font-size: 14px;
      line-height: 14px;
      font-weight: 400;
    }
    &-change{
      display: none;
      position: absolute;
      right: 0;
      margin-left: 8px;
      text-align: center;
      border-radius: 0 7px;
      &-icon{
        display:inline-block;
        line-height: 14px;
      }
    }
    &:hover {
      border-color: #409EFF;
      .show-file-change {
        display: block;
      }
    }
  }
}
</style>
