export default [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        default: 'en-US',
        baseNaivgator: true,
        antd: true,
      },
      dynamicImport: {
        // loadingComponent: './components/PageLoading/index',
        webpackChunkName: false,
      },
      title: {
        defaultTitle: 'idvert',
      },
      dll: false,
      pwa: false,
      hd: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    },
  ]
]