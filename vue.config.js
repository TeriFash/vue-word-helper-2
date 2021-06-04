let path = require('path')

module.exports = {
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       vue$: 'vue/dist/vue.esm.js',
  //       '@': path.resolve(__dirname, 'src/'),
  //     },
  //   },
  // },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  productionSourceMap: false,
  pluginOptions: {
    'sass-loader': {
      preProcessor: 'sass',
      patterns: [path.resolve(__dirname, './src/sass/main.scss')],
    },
  },
  configureWebpack: {
    plugins: [],
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          styles: {
            name: 'styles',
            test: m => m.constructor.name === 'CssModule',
            chunks: 'all',
            minChunks: 1,
            enforce: true,
          },
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
  pwa: {
    name: 'Word Tools',
    workboxPluginMode: 'InjectManifest',
    themeColor: '#4A90E2',
    msTileColor: '#4A90E2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#ffffff',
    },
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
  },

  transpileDependencies: ['vuetify'],
}
