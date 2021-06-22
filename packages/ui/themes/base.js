const { getThemeVariables } = require('antd/dist/theme')
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const fontSizeBase = '14px'

module.exports = {
  ...getThemeVariables(),
  'primary-color': '#61CE70',
  // 'body-background': '#3e3465',
  // 'layout-body-background': '#3e3465',
  'font-size-base': fontSizeBase,
  'form-item-margin-bottom': fontSizeBase,
  // eslint-disable-next-line
  'font-family': "Open Sans, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
}
