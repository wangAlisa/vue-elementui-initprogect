/*
 * @Author: wanglijuan01
 * @Date: 2020-02-29 10:46:08
 * @LastEditors: wanglijuan01
 * @LastEditTime: 2020-03-01 17:59:39
 * @Description: eslint 规则
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': [2, 'always'],
    'eol-last':0,
    'generator-star-spacing': 0,
    // "camelcase": ["error", {"allow": ["aa_bb"]}],
    // 'camelcase': [2, {'properties': 'never'}],
    'space-before-function-paren': [2, {'anonymous': 'always', 'named': 'never'}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
