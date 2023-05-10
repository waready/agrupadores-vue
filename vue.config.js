const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/Indicadores/'
  // : '/',
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/")
      }
    }
  }
});
