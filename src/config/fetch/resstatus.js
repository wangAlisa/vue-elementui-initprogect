/*
 * @Author: 
 * @Date: 2020-02-17 15:18:58
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-05-13 20:03:34
 * @Description: 
 */
import Message from '@common/message';
import router from '@/router/index';
import {localStorage} from '@common/utils';
// 数据过滤
export function checkState(res, resolve, reject) {
  switch (res.errNo) {
    case 0:
      resolve(res.data);
      break;
    case 70001:
      Message.error('用户未登录, 请先登录~');
      if (
        /localhost/.test(window.location.host) ||
        /127.0.0.1/.test(window.location.host)
      ) {
        window.open(res.errstr);
        router.push({path: '/login'});
      } else {
        window.location.href = res.errstr;
      }
      break;
    case 70003:
      Message.error('没权限，请联系管理员~');
      router.push({path: '/no-authority'});
      break;
    default:
      // 【note】如果errNo不为0和特殊的值，返回所有数据.
      Message.error(res.errStr || res.errstr);
      reject(res);
      break;
  }
}