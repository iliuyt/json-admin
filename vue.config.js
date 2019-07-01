const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
let plugins = [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)];
if (process.env.NODE_ENV === "prod") {
    plugins.push(
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            test: /\.js$|\.css/,
            threshold: 10240
        })
    );
}
module.exports = {
    publicPath: "front/",
    outputDir: `../src/main/resources/static/front`,
    pages: {
        index: {
            // page 的入口
            entry: "src/pages/index/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "JSON-ADMIN",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    },
    configureWebpack: {
        plugins: plugins
    }
};
