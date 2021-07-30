//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  pwa: {
    name: "Schuldenmanager",
    themeColor: "#37474F",
    msTileColor: "#37474F",
    appleMobileWebAppCache: "yes",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    },
  },
  configureWebpack: {
    plugins: [
      //new BundleAnalyzerPlugin(),
    ],
    optimization: {
      minimize: true,
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
        chunks: 'all'
      }
    },
    output: {
      crossOriginLoading: 'anonymous'
    }
  }
}