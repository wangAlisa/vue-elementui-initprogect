<!--
 * @Author: wanglijuan01
 * @Date: 2019-11-04 09:52:20
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:13:19
 * @Description: 视频上传
 * @params videoLimit:限制条件type:支持的类型，size:大小
           videoConfig:配置参数label：组件标题，action：上传的地址，data:接口参数，name:上传的文件名称，uploadTips:提示语，
           videoPid:视频id，videoName：视频的名字，videoUrl:视频的地址，videoTime：视频时长
 * @Function: uploadSuccess 成功时候的回调
 -->
<template>
  <div class="upload-video-container">
    <span class="upload-video-container-label" v-if="videoConfig.label">{{videoConfig.label}}</span>
    <div class="upload-video">
      <div class="upload-video-item">
        <el-upload
          class="upload-video-item-upload"
          ref="uploadVideoImg"
          v-if="!uploadDisabled"
          :name="videoConfig.name"
          :data ="videoConfig.data"
          :accept="videoLimit.type"
          :action="videoConfig.action"
          :show-file-list="false"
          :before-upload="beforeVideoUpload"
          :on-success="pushVideoSuccess"
          :on-remove="pushVideoRemove"
          :on-error="pushError"
          :multiple="false">
          <i v-if="!loading" class="el-icon-plus upload-video-item-icon"></i>
        </el-upload>
        <div v-else class="show-avatar">
         <!-- 预览video -->
        </div>
        <div class="upload-video-item-videoMsg">
          <span v-if="videoName" class="upload-video-item-videoMsg-limit">视频名称：{{videoName}}</span>
          <span v-if="videoTime" class="upload-video-item-videoMsg-limit">视频时长：{{videoTime}}</span>
        </div>
      </div>
      <div class="el-upload-tip" v-if="uploadTips" slot="tips">{{uploadTips}}</div>
      <div class="el-upload-tip" v-else slot="tips">{{handleTip}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'templateUpload',
  props: {
    videoLimit: {
      type: Object,
      default: () => {
        return {};
      }
    },
    videoConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      currentVideoUrl: this.videoConfig.videoUrl,
      uploadDisabled: !!this.videoConfig.videoUrl,
      videoName: this.videoConfig.videoName,
      videoTime: this.videoConfig.videoTime,
      uploadTips: this.videoConfig.uploadTips, // 建议视频使用较好的H.264/AAC的视频编码格式且小于100M!
      loading: false
    };
  },
  computed: {
    handleTip() {
      let tips = '';
      if (!this.videoLimit) {
        return;
      }
      if (this.videoLimit.type) {
        tips += `视频只支持上传${this.videoLimit.type}格式`;
      }
      if (this.videoLimit.duration) {
        tips += `，视频时长不超过${this.videoLimit.duration}s`;
      }
      if (this.videoLimit.size) {
        tips += `，视频大小不超过${this.showSize}`;
      }
      return tips;
    },
    // 处理视频tip
    showSize() {
      const vdoSize = this.videoLimit.size;
      return vdoSize < 1
        ? vdoSize * 1000 + 'KB !'
        : vdoSize + 'M !';
    }
  },
  methods: {
    // 删除视频
    handleDelete() {
      this.uploadDisabled = false;
      this.loading = false;
      this.videoName = '';
      this.videoTime = '';
      this.currentVideoUrl = '';
      this.$emit('uploadSuccess', {});
    },
    // 处理视频上传前
    beforeVideoUpload(file) {
      console.log(123123, file);
      const adoLimit = this.videoLimit;
      const isLt100M = file.size / 1024 / 1024;
      return new Promise((resolve, reject) => {
        if (adoLimit.type.toLowerCase().indexOf(file.type.toLowerCase()) === -1) {
          this.$message.error(`视频文件只能是${adoLimit.type}格式!`);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
        }
        if (isLt100M > adoLimit.size) {
          this.$message.error(`视频大小不能超过${adoLimit.size}MB!`);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
        }
        this.getTimes(file).then(duration => {
          this.videoTime = duration + 'S';
          if (duration > adoLimit.duration) {
            this.$message.error(`音频时长不能超过${adoLimit.duration}S!`);
            // eslint-disable-next-line prefer-promise-reject-errors
            reject();
          } else {
            this.loading = true;
            resolve();
          }
        });
      });
    },
    // 处理视频上传删除
    pushVideoRemove(file, fileList) {
      this.uploadDisabled = false;
      this.loading = false;
      this.videoName = '';
      this.videoTime = '';
      this.currentVideoUrl = '';
    },
    // 处理视频上传成功
    pushVideoSuccess(res, file, fileList) {
      this.loading = false;
      if (res.errNo) {
        this.$message.error(res.errstr);
        return;
      }
      this.uploadDisabled = true;
      this.videoName = file.name;
      this.currentVideoUrl = res.data.url;
      this.$message({ message: '上传成功！', type: 'success' });
      this.$emit('uploadSuccess', Object.assign({}, file, res.data));
    },
    // 上传视频失败
    pushError(res, file) {
      this.loading = false;
      this.$message({ message: '上传失败！', type: 'error' });
    },
    // 获取时长
    getTimes(file) {
      return new Promise((resolve, reject) => {
        const content = file;
        const url = URL.createObjectURL(content);
        // 经测试，发现audio也可获取视频的时长
        const audioElement = new Audio(url);
        audioElement.addEventListener('loadedmetadata', (_event) => {
          resolve(parseInt(audioElement.duration));
        });
      });
    }
  }
};
</script>
<style lang="less" type="text/less" scoped>
.upload-video-container {
  align-items: center;
  display: flex;
  &-label {
    width: 83px;
    padding-left: 30px;
    font-weight: bold;
    color: #757678;
    &::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
  }
  .upload-video {
    margin-right: 20px;
    &-item {
      margin-right: 10px;
      &-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border: 1px dashed #d9d9d9;
      }
      &-loading{
        border: 1px dashed #d9d9d9;
        color: #8c939d;
        width: 40px;
        height: 40px;
        line-height: 40px;
        padding:40px;
        text-align: center;
      }
      &-upload{
        display:inline-block;
      }
      &-videoMsg{
        display:inline-block;
        margin-left:20px;
        vertical-align: bottom;
        &-limit{
          display:block;
          width:200px;
          line-height:20px;
          font-size: 12px;
          color:#757678;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .el-upload-tip{
    font-size: 12px;
    color: #ccc;
    height:24px;
  }

  .show-avatar{
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    // margin: 15px 5px 20px 0 ;
    &-check_avatar {
      width: 200px;
      height: 120px;
      display: block;
      object-fit: contain;
    }
    &-change{
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      text-align: center;
      background: rgba(0, 14, 1, 0.8);
      border-radius: 0 7px;
      &-icon{
        display:inline-block;
        height:40px;
        width:50px;
        line-height: 40px;
        color:#fff;
      }
    }
    &:hover {
      border-color: #409EFF;
      .show-avatar-change {
        display: block;
      }
    }
  }
}
</style>
