/*
 * @Author: wanglijuan01
 * @Date: 2020-03-01 20:59:34
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-14 09:28:12
 * @Description: 左侧菜单
 */

const MENU_LIST = [
  {
    menuId: '1',
    menuName: 'table页',
    routeName: 'datapage',
    path: '/layout/table',
    menuIcon: 'el-icon-food',
    children: [
      {
        menuId: '1',
        menuName: 'table',
        routeName: 'datapage',
        path: '/layout/table'
      },
      {
        menuId: '2',
        menuName: 'table1',
        routeName: 'datapage',
        path: '/layout/table1'
      }
    ]
  },
  {
    menuId: '2',
    menuName: 'form页',
    routeName: 'formpage',
    menuIcon: 'el-icon-dessert',
    path: '/layout/form',
    children: []
  },
  {
    menuId: '3',
    menuName: '文本编辑器',
    routeName: 'textpage',
    menuIcon: 'el-icon-ice-cream',
    path: '/layout/text',
    children: []
  },
  {
    menuId: '4',
    menuName: '结果&缺省',
    routeName: 'result',
    menuIcon: 'el-icon-hot-water',
    children: [
      {
        menuId: '1',
        menuName: '没权限',
        routeName: 'noauthority',
        path: '/no-authority'
      },
      {
        menuId: '2',
        menuName: '404',
        routeName: 'notFound',
        path: '/404'
      }
    ]
  }
];

export {
  MENU_LIST
};
