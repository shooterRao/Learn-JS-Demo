const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const path = require("path");

const productionGzipExtensions = ["js", "css"];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  baseUrl: process.env.NODE_ENV === "development" ? "/" : "./",
  devServer: {
    port: 9096,
    open: true
  },
  // vue-echarts-v3需要babel转码，才能兼容ie
  // 参考 https://github.com/xlsdg/vue-echarts-v3#usage
  transpileDependencies: ["node_modules/vue-echarts-v3/src"],
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "@/styles/mixin.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("FZBZ", resolve("src/views/FZBZ"))
      .set("JCYJ", resolve("src/views/JCYJ"))
      .set("ZBMX", resolve("src/views/ZBMX"))
      .set("FZSC", resolve("src/views/FZSC"));
    // use svg
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.include
      .add(resolve("src/icon/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // image exclude svg
    const imagesRule = config.module.rule("images");
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve("src/icon/svg"))
      .end();
  },
  // 生产环境打包去除console.log
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true
            }
          },
          sourceMap: false
        })
      ]
    },
    // gzip
    plugins: process.env.NODE_ENV === "production" ? [
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ] : []
  }
};
