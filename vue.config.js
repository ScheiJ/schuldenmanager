//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
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
      new HtmlWebpackPlugin(),
      new PreloadWebpackPlugin()
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