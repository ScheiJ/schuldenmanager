//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  pwa: {
    name: "Schuldenmanager",
    themeColor: "#42b983",
    msTileColor: "#42b983",
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
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
        chunks: 'all'
      }
    }
  }
}
