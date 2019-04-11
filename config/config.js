import path from 'path'
import routes from './router.config'
import themes from './theme.config'
import plugins from './plugins.config'
export default {
  // add for transfer to umi
  plugins: plugins,
  exportStatic: false, // 是否开启路由静态HTML输出
  routes: routes, // 路由配置
  theme: themes,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableCSSModules: true,
  sass: {
    'node-sass': true,
  },
  cssnano: {
    mergeRules: false,
    autoprefixer: { remove: false }
  },
  targets: {
    ie: 11
  },
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV || 'dev',
  },
  outputPath: './dist',
  hash: true,
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  // base: 'dist',
  devServer: {
    proxy: {
      '/api_mock': {
        target: 'https://www.easy-mock.com/mock/5c77a726df6f65489b3c339b/idvert_copy/',
        changeOrigin: true,
        pathRewrite: { '^/api_mock': '' }
      },
      '/api_web': {
        target: 'http://aff.esmtong.cn:83',
        changeOrigin: true,
        // pathRewrite: { '^/api_web': '' }
      },
      '/api_user': {
        target: 'http://aff.esmtong.cn:83',
        changeOrigin: true,
        // pathRewrite: { '^/api_user': '' }
      }
    },
  },
};
