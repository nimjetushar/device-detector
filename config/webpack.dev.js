const path = require('path'),
  webpackMerge = require('webpack-merge'),
  basePath = process.cwd(),
  rootDir = path.resolve(basePath, './'),
  packageJson = require('../package.json'),
  commonConfig = require('./webpack.common.js'),
  port = packageJson.buildconfig.port;

module.exports = (mode) => {
  return webpackMerge(commonConfig(mode), {

    devServer: {
      historyApiFallback: true,
      inline: true,
      port,
      stats: 'minimal'
    },

    devtool: 'cheap-module-eval-source-map',
    mode: 'development',

    output: {
      chunkFilename: '[id].chunk.js',
      filename: '[name].js',
      path: path.resolve(rootDir, 'dist'),
      publicPath: `http://localhost:${port}/`
    }
  });
};
