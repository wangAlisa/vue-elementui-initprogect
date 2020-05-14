/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : wanglijuan01
 * @Date: 2019-10-17 11:05:25
 * @LastEditTime : 2019-12-30 19:46:20
 */
export default function downloadUrl(url) {
  let tempLink = document.createElement('a');
  tempLink.download = '';
  tempLink.style.display = 'none';
  tempLink.target = "_blank";
  tempLink.href = url;
  tempLink.click();
  tempLink = null;
}
