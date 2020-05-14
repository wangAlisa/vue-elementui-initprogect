/*
 * @Author: wanglijuan01
 * @Date: 2020-02-29 19:50:18
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-04 11:46:57
 * @Description: home 子路由
 */

import Table from '@views/home/table/Table.vue';
import Table1 from '@views/home/table/Table1.vue';
export default [
  {
    path: 'table',
    name: 'Table',
    component: Table,
    meta: {
      title: 'table列表',
      parentPath: '/layout'
    }
  },
  {
    path: 'table1',
    name: 'Table',
    component: Table1,
    meta: {
      title: 'table列表1',
      parentPath: '/layout'
    }
  }
];
