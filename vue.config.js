module.exports = {
  transpileDependencies: [
    'vuetify'
  ], 
  pwa: {
    name: "Schuldenmanager",
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCache: "yes",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    },
  }
}
