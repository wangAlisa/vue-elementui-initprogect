<!--
 * @Author: wanglijuan01
 * @Date: 2019-11-04 09:52:20
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:18:21
 * @Description: 音频上传
 * @params audioLimit:限制条件type:支持的类型，size:大小
           audioConfig:配置参数label：组件标题，action：上传的地址，data:接口参数，name:上传的文件名称，uploadTips:提示语，
           audioPid:音频id，audioName：音频的名字，audioUrl:音频的地址，
 * @Function: uploadSuccess 成功时候的回调
 -->
<template>
  <div class="upload-audio-container">
    <span class="upload-audio-container-label" v-if="audioConfig.label">{{audioConfig.label}}</span>
    <div class="upload-audio">
      <div class="upload-audio-item">
        <el-upload
          class="upload-audio-item-upload"
          ref="uploadaudioImg"
          v-if="!uploadDisabled"
          :name="audioConfig.name"
          :data ="audioConfig.data"
          :accept="audioLimit.type"
          :action="audioConfig.action"
          :show-file-list="false"
          :before-upload="beforeAudioUpload"
          :on-success="pushAudioSuccess"
          :on-remove="pushAudioRemove"
          :on-error="pushError"
          :multiple="false">
          <i v-if="!loading" class="el-icon-plus upload-audio-item-icon"></i>
        </el-upload>
        <div v-else class="show-avatar">
          <!-- 音频预览 -->
        </div>
        <div v-if="audioName" class="upload-audio-item-audioMsg">音频名称：{{audioName}}</div>
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
    audioLimit: {
      type: Object,
      default: () => {
        return {};
      }
    },
    audioConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      currentAudioUrl: this.audioConfig.audioUrl,
      uploadDisabled: !!this.audioConfig.audioUrl,
      audioName: this.audioConfig.audioName,
      uploadTips: this.audioConfig.uploadTips, // 建议音频使用较好的H.264/AAC的音频编码格式且小于100M!
      loading: false
    };
  },
  computed: {
    handleTip() {
      let tips = '';
      if (!this.audioLimit) {
        return;
      }
      if (this.audioLimit.type) {
        tips += `音频只支持上传${this.audioLimit.type}格式`;
      }
      if (this.audioLimit.duration) {
        tips += `，视频时长不超过${this.audioLimit.duration}S`;
      }
      if (this.audioLimit.size) {
        tips += `，音频大小不超过${this.showSize}`;
      }
      return tips;
    },
    // 处理音频tip
    showSize() {
      const adoSize = this.audioLimit.size;
      return adoSize < 1
        ? adoSize * 1000 + 'KB !'
        : adoSize + 'M !';
    }
  },
  methods: {
    // 删除音频
    handleDelete() {
      this.uploadDisabled = false;
      this.loading = false;
      this.audioName = '';
      this.currentAudioUrl = '';
      this.$emit('uploadSuccess', {});
    },
    // 处理音频上传前
    beforeAudioUpload(file) {
      const adoLimit = this.audioLimit;
      const isLt100M = file.size / 1024 / 1024;
      return new Promise((resolve, reject) => {
        if (adoLimit.type.toLowerCase().indexOf(file.type.toLowerCase()) === -1) {
          this.$message.error(`音频文件只能是${adoLimit.type}格式!`);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
        }
        if (isLt100M > adoLimit.size) {
          this.$message.error(`音频大小不能超过${adoLimit.size}MB!`);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
        }
        this.getTimes(file).then(duration => {
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
    // 处理音频上传删除
    pushAudioRemove(file, fileList) {
      this.uploadDisabled = false;
      this.loading = false;
      this.audioName = '';
      this.currentAudioUrl = '';
    },
    // 处理音频上传成功
    pushAudioSuccess(res, file, fileList) {
      this.loading = false;
      if (res.errNo) {
        this.$message.error(res.errstr);
        return;
      }
      this.uploadDisabled = true;
      this.audioName = '';
      this.currentAudioUrl = res.data.url;
      this.$message.success('上传成功！');
      this.$emit('uploadSuccess', res.data);
    },
    // 上传音频失败
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
.upload-audio-container {
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

  .upload-audio {
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
      &-upload{
        width:240px;
        display:inline-block;
        vertical-align: middle;
      }
      &-audioMsg{
        line-height:36px;
        color:#757678;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }

  .el-upload-tip{
    font-size: 12px;
    color: #ccc;
  }

  .show-avatar{
    position: relative;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
    vertical-align: middle;
    &-check_avatar {
      padding:70px 30px 0 0;
    }
    &-change{
      display: none;
      position: absolute;
      right: 0;
      bottom:0;
      width: 40px;
      text-align: center;
      &-icon{
        display:inline-block;
        height:30px;
        width:40px;
        line-height: 30px;
        color:#ccc;
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
