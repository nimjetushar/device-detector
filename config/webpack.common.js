const HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

function fileLoaderOpt(type) {
  return {
    name: '[name].[ext]',
    outputPath: type,
    publicPath: type
  };
}

module.exports = mode => {
  return {
    entry: {
      app: './src/index.js',
      polyfills: './src/polyfills.js'
    },

    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          !mode ?
            'style-loader' :
            MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        include: /node_modules/,
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: fileLoaderOpt('font')
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: fileLoaderOpt('image')
        }]
      }
      ]
    },

    optimization: {
      mergeDuplicateChunks: true,
      splitChunks: {
        chunks: 'all',
        maxAsyncRequests: 5,
        minChunks: 1
      }
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: './index.html', // Output FileName
        template: './public/index.html' // Input FileName
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      })
    ],

    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
