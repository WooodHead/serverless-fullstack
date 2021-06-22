module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14',
        },
      },
    ],
  ],
  plugins: [
    'source-map-support',
  ],
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
        '@babel/plugin-transform-async-to-generator',
      ],
    },
  },
}
