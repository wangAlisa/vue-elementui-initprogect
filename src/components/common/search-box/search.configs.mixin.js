/*
//使用的页面提供---------6个组建
search有输入框（input）,
下拉选择（select,select-multiple）,
日期选择（timeSelect),
日期时间选择器(datetimeSelect),
选框组(checkboxGroup)
search: [{
    type: 'input', //类型是输入框
    model: 'id', //绑定的值为id
    default: '',
    label: '用户ID', //标签
    placeholder: '请输入id'
  },
  {
    type: 'select/select-multiple', //如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'name',
    default: '',
    label: '用户名',
    placeholder: '请输入用户名',
    aliasConfig: { //如果后端给的数据结构不是label/value结构的话，可以使用该配置进行
      label: "name",
      value: "value"
    },
    options: [{
      value: "Option1",
      label: "Option1"
    }]
  },
  {
    type: 'checkboxGroup',
    model: 'checkList',
    default: '',
    label: '选择box',
    placeholder: '请选择box',
    options: [{
      lable: '',
      value: ''
    }]
  },
  {
    type: 'timeSelect', // 日期选择器
    model: 'time', //返回的时间会在原有字段上加上start和end为starttime,endtime.注意：endtime为当前截止时间的23：59：59。时间单位都为秒
    default: '',
    label: '选择时间',
    placeholder: '请选择时间',
    aliasConfig: { //如果后端给的数据结构不是label/value结构的话，可以使用该配置进行
      start: "startTime",
      end: "endTime"
    },
  },
  {
    type: 'datetimeSelect', //日期时间选择器
    model: '', //绑定字段值
    default: '',
    label: '选择日期时间',
    placeholder: '请选择日期时间',
  }
] */
export default {
  data() {
    return {
      initBtns: [
        {
          type: 'Submit',
          name: '查询',
          btnType: 'primary'
        },
        {
          type: 'Reset',
          name: '重置'
        }
      ],
      configs: {
        // input组件
        input: (val, options) => {
          return (
            <el-input
              v-model={options.form[val.model]}
              nativeOn-keyup={val => val.keyCode === 13 && this.contentChange()}
              placeholder={val.placeholder}
              disabled={val.disabled || false}
              clearable
            />
          );
        },
        // select组件
        select: (val, options) => {
          return (
            <el-select
              v-model={options.form[val.model]}
              placeholder={val.placeholder}
              filterable={val.filterable || false}
              disabled={val.disabled || false}
              onChange={(val.onChange && val.onChange.bind(this)) || this.contentChange}
            >
              {val.options.map(item => {
                return (
                  <el-option
                    value={this.dealOption(item, val, 'value')}
                    label={this.dealOption(item, val, 'label')}
                  />
                );
              })}
            </el-select>
          );
        },
        //
        // select-multiple组件
        'select-multiple': (val, options) => {
          return (
            <el-select
              v-model={options.form[val.model]}
              multiple={true}
              placeholder={val.placeholder}
              onChange={this.contentChange}
            >
              {val.options.map(item => {
                return (
                  <el-option
                    value={this.dealOption(item, val, 'value')}
                    label={this.dealOption(item, val, 'label')}
                  />
                );
              })}{' '}
            </el-select>
          );
        },
        // checkboxGroup组件
        checkboxGroup: (val, options) => {
          return (
            <el-checkbox-group
              v-model={options.form[val.model]}
              nativeOnChange={this.contentChange}
            >
              {val.options.map((option, $key) => {
                return (
                  <el-checkbox key={$key} label={option.value}>
                    {option.label}
                  </el-checkbox>
                );
              })}
            </el-checkbox-group>
          );
        },
        // timeSelect组件
        timeSelect: (val, options) => {
          return (
            <el-date-picker
              v-model={options.form[val.model]}
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy/MM/dd"
              value-format="timestamp"
              onChange={this.contentChange}
              picker-options={this.pickerOptions2}
            />
          );
        },
        // datetimeSelect组件
        datetimeSelect: (val, options) => {
          return (
            <el-date-picker
              v-model={options.form[val.model]}
              type="datetime"
              value-format="timestamp"
              onChange={this.contentChange}
              placeholder={val.placeholder}
            />
          );
        },
        searchBtn: (val, options) => {
          return (
            <el-button
              type={val.btnType}
              size={val.size || 'mini'}
              // icon={icon[val.type]}
              disabled={val.disabled || false}
              on-click={this[`on${val.type}`]}
            >
              {val.name}
            </el-button>
          );
        }
      }
    };
  },
  methods: {
    /**
     * @Description: 给FORM配置内容
     * @param {type}
     * @return:
     */
    generateForm() {
      const children = [];
      this.search.map((val, $key) => {
        const func = this.configs[val.type];
        if (func) {
          children.push(
            this.insertDom(
              val,
              $key,
              func(val, {
                form: this.form
              })
            )
          );
        }
      });
      // 添加检索和删除按钮
      children.push(this.generateBtn());
      return children;
    },

    /**
     * @Description: 给每个子表单添加el-form-item
     * @param {type}
     * @return:
     */
    insertDom(val, $key, innerDom) {
      return (
        <el-form-item
          label={val.label ? val.label + '：' : ''}
          class="self-collapse-item"
          key={$key}
        >
          {innerDom}
        </el-form-item>
      );
    },

    /**
     * @Description: 返回查询重置按钮组件
     * @param {type}
     * @return:
     */
    generateBtn() {
      let list = [];
      list = this.searchBtns.length > 0 ? this.searchBtns : this.initBtns;
      if (this.hideBtn) {
        return;
      }
      return (
        <el-button-group class="self-collapse-btns" style={this.computedStyle}>
          {list.map(this.configs.searchBtn)}
        </el-button-group>
      );
    },
    contentChange() {
      this.onSubmit();
    },
    dealOption(item, val, exp) {
      return item[exp] === undefined ? item[val.aliasConfig[exp]] : item[exp];
    }
  }
};
