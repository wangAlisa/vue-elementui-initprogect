<!--
 * @Description: This is a description
 * @Author: wanglijuan01
 * @LastEditors: wanglijuan01
 * @Date: 2019-10-09 19:24:51
 * @LastEditTime: 2020-05-14 10:05:11
 -->

<script>
import configs from './search.configs.mixin.js';
const initData = {
  input: '',
  select: '',
  timeSelect: '',
  datetimeSelect: '',
  'select-multiple': '',
  checkboxGroup: []
};
export default {
  name: 'hx-search',
  mixins: [configs],
  props: {
    searchList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 搜索按钮
    searchBtns: {
      type: Array,
      default: () => []
    },
    // 是否隐藏btn
    hideBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false,
      isShow: false,
      form: {},
      computedStyle: {},
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.dealForm();
  },
  mounted() {
    this.checkisShow();
    this.$nextTick(this.checkisShow);
    this.$bus.$on('resize', this.onResize);
  },
  computed: {
    computedDropDowm() {
      return this.isActive ? '收起' : '展开';
    }
  },
  methods: {
    dealForm() {
      const temp = {};
      if (this.searchList) {
        this.searchList.map(val => {
          temp[val.model] =
            val.default !== '' ? val.default : initData[val.type];
        });
        this.search = this.searchList;
        this.form = temp;
      } else {
        console.error('没有searchList');
      }
    },
    // 屏幕尺寸调整时的回调
    onResize() {
      this.$nextTick(this.checkisShow);
    },
    // 提交检索数据
    onSubmit() {
      const data = this.getData();
      this.$bus.$emit('search', data);
    },
    // 展开按钮
    handleHeaderClick() {
      this.isActive = !this.isActive;
    },
    // 重置检索
    onReset() {
      for (const i in this.form) {
        this.form[i] = undefined;
        this.searchList[i] = '';
      }
      this.$bus.$emit('reset');
    },
    // 准备检索数据
    getData() {
      let data = JSON.parse(JSON.stringify(this.form));
      // 如果存在一个类型为时间选择
      if (this.search.some(val => val.type === 'timeSelect')) {
        data = this.dealTime(data);
      }
      // 如果存在一个类型为日期时间选择
      if (this.search.some(val => val.type === 'datetimeSelect')) {
        data = this.dealDateTime(data);
      }
      console.log('searchData', data);
      return data;
    },
    // 有时间选择器的时候进行处理
    dealTime(data) {
      let obj, model;
      this.search
        .filter(val => val.type === 'timeSelect')
        .map(val => {
          model = val.model;
          obj = data[model];
          if (obj && obj.length === 2) {
            if (
              val.aliasConfig &&
              val.aliasConfig.start &&
              val.aliasConfig.end
            ) {
              data[val.aliasConfig.start] = obj[0] / 1000;
              data[val.aliasConfig.end] = obj[1] / 1000 + 86400 - 1;
            } else {
              data['start' + model] = obj[0] / 1000;
              // 结束时间为当天23：59：59
              data['end' + model] = obj[1] / 1000 + 86400 - 1;
            }
            delete data[model];
          }
        });
      return data;
    },
    // 对日期时间选择器数据进行处理
    dealDateTime(data) {
      this.search
        .filter(val => val.type === 'datetimeSelect')
        .map(val => {
          const model = val.model;
          // 时间戳为秒级别
          if (data[model]) {
            data[model] = Math.round(Number(data[model]) / 1000);
          }
        });
      return data;
    },
    checkisShow() {
      if (!this.$refs.form) return;
      const $form = this.$refs.form.$el;
      const $children = $form.children;
      const top = $children[0].offsetTop;
      const length = $children.length;
      let left = 0;
      // 类数组先处理成数组
      this.isShow = Array.prototype.slice.call($children).some(val => {
        return val.offsetTop > top;
      });

      // TODO 没有找到具体原因，     offsetTop会在获取完之后变化！！！先解决问题
      // setTimeout(() => {
      // 有下拉
      if (this.isShow) {
        for (var i = 0; i < length; i++) {
          if ($children[i].offsetTop > top) {
            left = $children[i - 1].offsetLeft + $children[i - 1].offsetWidth;
            break;
          }
        }
      } else {
        // 无下拉-倒数第二个，不包含按钮组
        if ($children.length >= 2) {
          left =
            $children[length - 2].offsetLeft +
            $children[length - 2].offsetWidth;
        }
      }
      // 加个中间间距
      left += 20;

      // 如果超过最右方的兼容
      if ($form.offsetWidth - 150 < left) {
        this.computedStyle = {
          left: ''
        };
      } else {
        this.computedStyle = {
          left: left + 'px'
        };
      }
      // }, 500);
    }
  },
  render(h) {
    return h(
      'el-row',
      {
        class: ['self-collapse', { 'self-collapse__active': this.isActive }]
      },
      [
        this.search.length > 0
          ? [
            h(
              'el-col',
              {
                attrs: {
                  lg: 23,
                  md: 23,
                  xl: 23,
                  span: 23
                },
                on: {
                  resize: this.onResize
                }
              },
              [
                h(
                  'el-form',
                  {
                    attrs: {
                      inline: true,
                      model: this.form,
                      ref: 'form',
                      size: 'mini'
                    },
                    ref: 'form',
                    class: 'self-collapse-form',
                    nativeOn: {
                      submit: $event => {
                        $event.preventDefault();
                      }
                    }
                  },
                  this.generateForm()
                )
              ]
            ),
            [
              <el-col lg={1} md={1} xl={1} span={1} style="text-align:right">
                {this.isShow ? (
                  <el-button
                    style="padding:0"
                    type="text"
                    on-click={this.handleHeaderClick}
                    class="self-collapse-dropdown"
                    size="mini"
                  >
                    {this.computedDropDowm}
                    <i
                      class="el-icon--right"
                      class={
                        this.isActive
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      }
                    />
                  </el-button>
                ) : (
                  ''
                )}
              </el-col>
            ]
          ]
          : ''
      ]
    );
  },
  destroyed() {
    this.$bus.$off('resize', this.onResize);
  }
};
</script>
<style lang="less">
.self-collapse {
  position: relative;
  background: white;
  max-height: 50px;
  transition: max-height 0.3s ease-out;

  // .self-collapse-dropdown {
  //   position: absolute;
  //   right: 14px;
  //   top: 10px;
  // }

  .self-collapse-form {
    width:100%;
    position: relative;
    padding-right: 100px;
    box-sizing: border-box;
    height: 30px;
    overflow: hidden;

    .self-collapse-item {
      // margin-right: 26px;
      // .el-form-item__label {
      //   width: 112px;
      // }
      .el-form-item__content {
        .el-input {
          .el-input__inner {
            padding: 0 5px 0 5px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .el-input__suffix {
    right:0;
  }
  .el-input__icon {
    width:20px;
  }
  .self-collapse-btns {
    position: absolute;
    right: 5px;
    top: 0;
  }

  .el-input {
    width: 120px;
    &.el-date-editor--datetime {
      width: 140px;
    }
  }
  .el-range-editor.el-input__inner {
    width:210px;
    padding-left:10px;
    .el-input__icon{
      width:14px;
    }
  }

  .el-form-item__label {
    padding: 0;
    width: 76px;
    text-align: right;
  }
}

.self-collapse__active {
  max-height: 400px;
  transition: max-height 0.3s ease-out;

  .self-collapse-form {
    width:100%;
    height: auto;
    margin-bottom: -10px;
  }
}
.el-form--inline {
  .el-form-item {
    margin-right:10px;
  }
}

</style>
