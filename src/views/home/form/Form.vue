<!--
 * @Author: wanglijuan01
 * @Date: 2020-03-01 18:49:46
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-01 20:12:09
 * @Description: 多表单校验
 -->
<template>
  <section class="example">
    <el-form :model="exampleForm" size="medium" ref="exampleForm" :rules="rules" label-width="120px">
     <el-form-item label="父组件标题" prop="title">
        <el-input v-model="exampleForm.title" placeholder="标题" maxlength="20"></el-input>
        <span class="example-tip">建议不超过20个汉字</span>
      </el-form-item>
      <el-form-item label="子组件">
        <Child-Form ref="child"></Child-Form>
      </el-form-item>
      <el-form-item label="描述" prop="detail">
        <el-input type="textarea" v-model="exampleForm.detail" placeholder="描述"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer-dialog">
      <el-button size="medium" @click="addMaterial(false)">取消</el-button>
      <el-button size="medium" type="primary" @click="addMaterial(true)">确定</el-button>
    </div>
  </section>
 </template>
<script>
import ChildForm from '@views/home/form/childForm/index.vue';
export default {
  components: {
    ChildForm
  },
  data() {
    return {
      exampleForm: {
        title: '',
        detail: ''
      },
      rules: {
        title: [{ required: true, message: '标题', trigger: 'blur' }],
        detail: [{ required: true, validator: this.validDetail, trigger: 'blur' }]
      }
    };
  },
  methods: {
    validDetail(rule, value, callback) {
      if (!value) {
        callback(new Error('描述'));
      } else {
        callback();
      }
    },
    addMaterial(status) {
      if (status) {
        Promise.all([this.$refs.child.check(), this.$refs.exampleForm.validate()])
          .then((data) => {
            this.$message.warning('已保存');
          }, (error) => { console.log(error); });
      } else {
        this.$message.warning('已取消');
      }
    }
  }
};
</script>
 <style lang="less" scoped>
  .example {
    width:600px;
    padding: 30px;
    box-sizing: border-box;
    .footer-dialog{
      text-align: center;
      margin-top:80px;
    }
  }
 </style>
