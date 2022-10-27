const withAntdLess = require('next-plugin-antd-less')
const theme = require('./themes/base')

module.exports = withAntdLess({
  experimental: { appDir: true },
  modifyVars: { ...theme },
  // webpack(config) {
  //   return config
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
})
