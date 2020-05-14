<!--
 * @Author: wanglijuan01
 * @Date: 2018-11-29 16:48:44
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:19:37
 * @Description: 上传图片组件
 * @params imgLimitObj:限制条件type:支持的类型，size:大小，width:宽度，height:高度，isRatio:是否判断比例
           imageConfig:配置参数label：组件标题，action：上传的地址，data:接口参数，name:上传的文件名称，uploadTips:提示语，
           imagePid:图片id, hiddenPreview：是否需要预览，canDelete:是否显示删除按钮删除，imagName：图片的名字，imageUrl:图片的地址,
 * @Function: uploadSuccess 成功时候的回调
 * @type:传了type则显示button按钮
 -->
<template>
  <div class="upload-image-container">
    <span class="upload-image-container-label" v-if="imageConfig.label">{{imageConfig.label}}</span>
    <div class="upload-image-container-upload">
      <div class="upload-image-container-item">
        <el-upload
          ref="uploadImg"
          :action="imgConfig.action"
          :data="imgConfig.data"
          :name="imgConfig.name"
          :show-file-list="false"
          :disabled="loading"
          :on-success="handleImageUploadSuccess"
          :on-error="pushError"
          :before-upload="beforeImageUpload"
        >
          <el-button v-if="btnType" size="medium" type="primary">上传图片</el-button>
          <div  v-if="!uploadDisabled && !btnType" class="avatar-uploader">
            <i v-if="!loading" class="el-icon-plus avatar-uploader-icon"></i>
            <div v-loading="loading" element-loading-size="40px" class="avatar-uploader-loading"></div>
          </div>
        </el-upload>
        <div v-if="uploadDisabled && !btnType" class="show-avatar">
          <img :src="currentImageUrl" class="show-avatar-check_avatar" />
          <p class="show-avatar-change">
            <i v-if="!imgConfig.hiddenPreview" class="show-avatar-change-icon el-icon-view" @click="handlePictureCardPreview"></i>
            <i v-if="imgConfig.canDelete" class="el-icon-delete show-avatar-change-icon" @click="handlePictureCardDelete"></i>
          </p>
        </div>
        <span class="upload-image-container-item-imagname" v-if="imagName">{{ imagName }}</span>
        <div v-if="imgConfig.uploadTips" slot="tips" class="upload-image-container-item-tip">
          {{ imgConfig.uploadTips }}
        </div>
        <div v-else slot="tip" class="upload-image-container-item-tip"> {{ handleImgTip }}</div>
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
    imgLimitObj: {
      type: Object,
      default: () => {
        return {
          type: 'png,jpg,jpeg',
          size: 0.2
        };
      }
    },
    imageConfig: {
      type: Object,
      default: () => {
        console.error('imageConfig is nessesary arguments');
        return {
          imageUrl: '',
          imagName: '',
          label: '',
          action: this.computedEnv(),
          name: 'upImg',
          uploadTips: '',
          hiddenPreview: ''
        };
      }
    },
    type: {
      type: String
    }
  },
  watch: {
    'imageConfig.imageUrl': {
      handler(newUrl, oldUrl) {
        this.currentImageUrl = newUrl;
        this.uploadDisabled = !!newUrl; // 是否禁止上传
        console.log(newUrl);
      },
      immediate: true
    }
  },
  data() {
    return {
      btnType: this.type,
      currentImageUrl: '',
      uploadDisabled: false, // 是否禁止上传
      imagName: '',
      dialogVisible: false,
      dialogVisibleImgs: [], // 预览图片的盒子
      loading: false,
      imgConfig: {
        imageUrl: '',
        imagName: '',
        label: '',
        action: '',
        name: '',
        uploadTips: '',
        hiddenPreview: '',
        canDelete: true
      }
    };
  },
  mounted() {
    this.imgConfig = Object.assign(this.imgConfig, this.imageConfig);
  },
  computed: {
    handleImgTip() {
      let tips = '';
      if (!this.imgLimitObj) {
        return;
      }
      if (this.imgLimitObj.type) {
        tips += `图片只支持上传${this.imgLimitObj.type}格式`;
      }
      if (this.imgLimitObj.size) {
        if (this.imgLimitObj.type) {
          tips += '，';
        }
        tips += `图片大小不超过${this.showSize}`;
      }
      return tips;
    },
    // 处理图片tip
    showSize() {
      const imgSize = this.imgLimitObj.size;
      return imgSize < 1 ? imgSize * 1000 + 'KB !' : imgSize + 'M !';
    }
  },
  methods: {
    // 判断图片尺寸和类型
    beforeImageUpload(file) {
      const imgLimit = this.imgLimitObj;
      if (
        imgLimit.type
          .toLowerCase()
          .indexOf(file.type.split('/')[1].toLowerCase()) === -1
      ) {
        this.$message.error(`图片只能是${imgLimit.type}格式!`);
        return false;
      }
      if (file.size / 1024 / 1024 >= imgLimit.size) {
        this.$message.error('素材过大，请调整素材大小');
        return false;
      }
      this.loading = true;
    },
    // 图片上传成功 回调
    handleImageUploadSuccess(res, file, fileList) {
      this.loading = false;
      if (res.errNo) {
        this.$message.error(res.errstr);
        return;
      }
      this.uploadDisabled = true;
      this.$emit('uploadSuccess', res.data);
      this.$message({ message: '上传成功！', type: 'success' });
    },
    // 图片的预览
    handlePictureCardPreview() {
      this.dialogVisible = true;
      this.dialogVisibleImgs = [this.currentImageUrl];
    },
    // 删除图片
    handlePictureCardDelete() {
      this.currentImageUrl = '';
      this.imagName = '';
      this.uploadDisabled = false;
      this.dialogVisible = false;
      this.dialogVisibleImgs = [];
      this.$emit('uploadSuccess', {});
    },
    // 上传图片失败
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
.upload-image-container {
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
    &-imagname {
      margin-left: 20px;
    }
  }
  .avatar-uploader {
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
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
      object-fit: contain;
    }
  }
  .show-avatar {
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
    &-check_avatar {
      width: 120px;
      height: 120px;
      display: block;
      object-fit: contain;
    }
    &-change {
      display: none;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 25px;
      text-align: center;
      background: rgba(117, 118, 120, 0.8);
      border-radius: 0, 0, 7px 7px;
      &-icon {
        display: inline-block;
        height: 30px;
        width: 50px;
        line-height: 25px;
        color: rgb(225,226,230);
      }
    }
    &:hover {
      border-color: #409eff;
      .show-avatar-change {
        display: block;
      }
    }
  }
}
// 服了这个组件库
/deep/img {
  height: 100% !important;
}
</style>
