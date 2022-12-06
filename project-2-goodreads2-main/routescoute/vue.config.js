const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "RouteScout",
    themeColor: "#a5b4fc",
  }
})
