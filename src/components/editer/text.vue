<!--
 * @Author: wanglijuan01
 * @Date: 2019-11-13 17:36:12
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-13 21:03:53
 * @Description: 文本
 -->
<template>
  <section>
    <div-editor class="publish-box"
    :showBtnInfo="showBtnInfo"
    :editerContent="editerMertiral"
    :INPNUM="INPNUM"
    :placeholder="placeholder"
    @sendMessage="sendMessage"></div-editor>
  </section>
</template>
<script>
import DivEditor from '@components/common/divFollowinput/div-editor.vue';
export default {
  components: {
    DivEditor
  },
  props: {
    editerMertiral: {
      type: Object,
      default: () => {
        return {};
      }
    },
    massType: {
      type: Number
    }
  },
  data() {
    return {
      showBtnInfo: this.massType === 2 ? ['link', 'minipro', 'variable'] : ['link', 'minipro'],
      INPNUM: 680,
      placeholder: '请输入内容'
    };
  },
  methods: {
    sendMessage(val, status) {
      this.$emit('addMaterial', 'text', val, status);
    }
  }
};
</script>
<style lang="less" scoped>
</style>