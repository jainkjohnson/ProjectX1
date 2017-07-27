const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PORT = 4000;
const DEV_URL = `http://localhost:${PORT}`;

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'client/src');

const config = {
  context: path.resolve(__dirname, '..'),
  entry: './index.js',
  devServer: {
    historyApiFallback: true,
    publicPath: DEV_URL,
    port: PORT,
  },
  output: {
    filename: 'bundle.js',
    publicPath: DEV_URL
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        loader : 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader?importLoaders=2&module&localIdentName=[path][name]-[local]&-autoprefixer&-minimize',
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader?modules!less-loader'
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './webpack/templates/index.ejs',
      production: false,
      // tags: [
      //   '<script type="text/javascript" src="/dist/bundle.js" charSet="UTF-8"></script>',
      // ].join('')
    })
  ]
};

module.exports = config;