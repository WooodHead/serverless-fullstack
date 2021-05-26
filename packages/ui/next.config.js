const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const theme = require('./themes/base')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withCSS({
  cssModules: true,
  ...withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      importLoaders: 0,
      modifyVars: {
        // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
        '@primary-color': theme.primaryColor,
        // '@body-background': theme.bodyBackground,
        // '@layout-body-background': theme.layoutBodyBackground,
        '@font-size-base': theme.fontSizeBase,
        '@form-item-margin-bottom': theme.formItemMarginBotom,
      },
    },
    cssLoaderOptions: {
      importLoaders: 3,
      localIdentName: '[local]___[hash:base64:5]',
    },
  }),
})
