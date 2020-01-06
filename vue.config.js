const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  publicPath: "/",
  assetsDir: "static",
  configureWebpack: config => {
    //生产模式启用gzip压缩
    if (process.env.NODE_ENV === "prod") {
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]", //目标资源文件名称
          algorithm: "gzip", //压缩算法
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, //匹配所有对应的文件
          threshold: 10240, //只处理比这个值大的资源。按字节计算
          minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理（minRatio = 压缩大小 / 原始大小）
          deleteOriginalAssets: false //是否删除原始资源
        }),
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require("./public/vendor/vendor-manifest.json")
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, "./public/vendor/*.js"),
          // dll 引用路径
          publicPath: `${process.env.BASE_URL}static/js/vendor`,
          // dll最终输出的目录
          outputPath: "static/js/vendor"
        })
      );
      // 合并plugins
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@router", resolve("src/router"))
      .set("@views", resolve("src/views"));
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          //  可以是`server`，`static`或`disabled`。
          //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
          //  在“静态”模式下，会生成带有报告的单个HTML文件。
          //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
          analyzerMode: "static"
        }
      ]);
    }
  }
};
