const withAntdLess = require('next-plugin-antd-less')
const theme = require('./themes/base')

module.exports = withAntdLess({
  modifyVars: { ...theme },
  // webpack(config) {
  //   return config
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
})
