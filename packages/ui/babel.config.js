module.exports = {
  presets: [['next/babel']],
  plugins: [
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@/components': './components',
      },
    }],
    ['import', { libraryName: 'antd', style: true }],
  ],
}
