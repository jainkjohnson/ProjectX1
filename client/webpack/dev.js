const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// webpack dev server uses this port and host name 
const PORT = 4000;
const DEV_URL = `http://localhost:${PORT}`;

const config = {

  // jump back to the webpack directory  
  context: path.resolve(__dirname, '..'),
  entry: [
    "font-awesome-webpack!./src/theme/font-awesome.config.js",
    './index.js',
  ],

  // dev server configuration
  devServer: {
    historyApiFallback: true,
    publicPath: DEV_URL,
    port: PORT,
  },

  // Using webpack dev server so that there is no
  // physical bundle.js file. It stores in the Ram.
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

  // Created a index.ejs file such that there is no physical index.html file.
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