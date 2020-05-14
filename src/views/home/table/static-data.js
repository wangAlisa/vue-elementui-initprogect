/*
 * @Author:
 * @Date: 2020-01-17 11:19:51
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-04 11:31:58
 * @Description:
 */
const searchData = [
  {
    type: 'input', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '应用场景',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '应用场景',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '应用场景',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'timeSelect', // 日期选择器
    model: 'time', // 返回的时间会在原有字段上加上start和end为starttime,endtime.注意：endtime为当前截止时间的23：59：59。时间单位都为秒
    default: '',
    label: '选择时间',
    placeholder: '请选择时间',
    aliasConfig: { // 如果后端给的数据结构不是label/value结构的话，可以使用该配置进行
      start: 'startTime',
      end: 'endTime'
    }
  },
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'datetimeSelect', // 日期时间选择器
    model: '', // 绑定字段值
    default: '',
    label: '日期时间',
    placeholder: '请选择日期时间'
  }
];
const searchData2 = [
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '应用场景',
    options: [],
    placeholder: '应用场景'
  },
  {
    type: 'timeSelect', // 日期选择器
    model: 'time', // 返回的时间会在原有字段上加上start和end为starttime,endtime.注意：endtime为当前截止时间的23：59：59。时间单位都为秒
    default: '',
    label: '选择时间',
    placeholder: '请选择时间',
    aliasConfig: { // 如果后端给的数据结构不是label/value结构的话，可以使用该配置进行
      start: 'startTime',
      end: 'endTime'
    }
  },
  {
    type: 'select', // 如果带上multiple则会在组件中加上multiple的属性，default的值应该是一个空串
    model: 'apply_scene',
    default: '',
    aliasConfig: {
      label: 'name',
      value: 'id'
    },
    label: '',
    options: [],
    placeholder: '应用场景'
  }
];

export {
  searchData,
  searchData2
};