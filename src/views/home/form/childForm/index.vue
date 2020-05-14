<!--
 * @Author: wanglijuan01
 * @Date: 2020-03-01 15:30:44
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 10:01:10
 * @Description: form表单
 -->
<template>
  <section class="child">
    <el-form :model="childForm" size="medium" ref="childForm" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="childForm.title" placeholder="标题" maxlength="20"></el-input>
        <span class="child-tip">建议不超过20个汉字</span>
      </el-form-item>
      <el-form-item label="主题图片" prop="local_content" class="child-headimg">
        <Upload-Image :imgLimitObj="imgLimitObj" :imageConfig="imageConfig" @uploadSuccess="uploadSuccess"></Upload-Image>
      </el-form-item>
      <el-form-item label="类型" size="medium">
      <el-radio-group v-model="childForm.type" prop="msg_type">
        <el-radio :label="1">类型1</el-radio>
        <el-radio :label="2">类型2</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述" prop="detail">
      <el-input type="textarea" v-model="childForm.detail" placeholder="描述"></el-input>
      <span class="child-tip">描述</span>
    </el-form-item>
    </el-form>
  </section>
</template>
<script>
import UploadImage from '@components/common/upload/image-upload';
export default {
  components: {
    UploadImage
  },
  data() {
    return {
      childForm: {
        title: '',
        detail: '',
        type: 1
      },
      rules: {
        title: [{ required: true, message: '标题', trigger: 'blur' }],
        detail: [{ required: true, message: '描述', trigger: 'blur' }],
        local_content: [{ required: true, message: '主题图片', trigger: 'blur' }]
      },
      imgLimitObj: {
        type: 'image/bmp,image/jpeg,image/jpg,image/gif,image/png',
        size: '5'
      },
      imageConfig: {
        // label: "客服头像",
        action: process.env.VUE_APP_PROXY + '/wxadmin/wechat/addmaterial', // testAddress
        data: { type: 'image' },
        name: 'material_file',
        uploadTips: '建议尺寸:520px*416px',
        imagePid: '',
        hiddenPreview: '', // 是否显示预览按钮
        imagName: '', // 图片的名字
        imageUrl: ''
      }
    };
  },
  methods: {
    check() {
      return this.$refs.childForm.validate();
    },
    uploadSuccess(data) {
      // eslint-disable-next-line camelcase
      const { local_url = '', media_id = '' } = data;
      this.imageConfig = {
        ...this.imageConfig,
        imageUrl: local_url,
        imagePid: media_id
      };
      this.$set(this.childForm, 'local_content', local_url);
      this.$set(this.childForm, 'thumb_media_id', media_id);
    }
  }
};
</script>
<style lang="less" scoped>
 .child {
   width:600px;
   box-sizing: border-box;
   border: 1px dashed #ccc;
   padding: 20px 0 0;
    .child-tip {
      padding:0;
      margin:0;
      font-size:10px;
      color:#ccc;
      line-height:18px;
      margin-left:5px;
      }
      /deep/.el-form-item__error{
        margin-top:-2px;
      }
      .kf-allot-headimg{
        /deep/.el-form-item__error{
          margin-top:2px;
        }
      }
      /deep/.el-input,
      /deep/.el-textarea{
      width:300px;
      }
      /deep/.el-input__inner{
      width: 300px;
      }
      /deep/.el-form-item {
        margin-bottom:40px;
      }
    }
</style>