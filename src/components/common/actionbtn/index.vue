<!--
 * @Author: wanglijuan01
 * @Date: 2020-03-01 12:03:54
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-13 19:51:00
 * @Description: 操作按钮
 -->
<script>
export default {
  props: {
    actionList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  created() {
    console.log(this.actionList, 'actionListactionList');
  },
  methods: {
    emitFather(cd) {
      cd();
    }
  },
  render() {
    return (<div>
      {this.actionList.map(item => {
        return <el-button type={item.btnType} size={item.size} onClick={() => this.emitFather(item.calback)}>{item.content}</el-button>;
      })}
    </div>);
  }
};
</script>
<style lang="less">
</style>