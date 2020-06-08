const path = require('path'),
  webpackMerge = require('webpack-merge'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  commonConfig = require('./webpack.common.js'),
  basePath = process.cwd(),
  rootDir = path.resolve(basePath, './');

module.exports = mode => {
  return webpackMerge(commonConfig(mode), {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [new UglifyJsPlugin({
        include: /\.min\.js$/
      })]
    },
    output: {
      chunkFilename: '[id].chunk.[hash].js',
      filename: '[name].[hash].js',
      path: path.resolve(rootDir, 'dist'),
      publicPath: './'
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(rootDir, 'dist')]
      }),
      new OptimizeCSSAssetsPlugin({}),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(rootDir, 'public/favicon.ico'), to: '' }
        ]
      })
    ]
  });
};
