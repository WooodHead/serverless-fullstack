const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const theme = require('./themes/base')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => { }
}

module.exports = withCSS({
  cssModules: true,
  ...withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      importLoaders: 0,
      modifyVars: {
        ...theme,
      },
    },
    cssLoaderOptions: {
      importLoaders: 3,
      localIdentName: '[local]___[hash:base64:5]',
    },
  }),
})
