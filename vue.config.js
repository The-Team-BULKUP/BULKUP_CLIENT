const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa:{
    themeColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
  devServer:{
    port: process.env.VUE_APP_PORT || 3000,
  }
}
)