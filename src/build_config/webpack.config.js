var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postcssMergeRules = require('postcss-merge-rules');
var postcssMergeLonghands = require('postcss-merge-longhand');
var postcssMergeIdents = require('postcss-merge-idents');
var cssMqPacker = require('css-mqpacker');
var postcssSvgGo = require('postcss-svgo');


const autoprefix = {
  browsers: [
    'last 2 Chrome versions',
    'last 2 iOS versions',
    'last 1 ff version',
    'last 1 ie version',
    'Android >= 4',
    'Android 2.3',
    'last 2 Edge versions',
  ],
};

const settings = {
  development: {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'babel-polyfill',
      './examples/index.js'
    ],
    output: {
      publicPath: 'public/assets',
      path: './public/assets',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: "public",
      inline: true,
      hot: true,
      watch: true
    },
    devtool: "source-map"
  },
  production: {
    entry: [
      'babel-polyfill',
      './src/index.js'
    ],
    output: {
      publicPath: 'lib',
      path: './lib',
      filename: 'bundle.js'
    }
  }
};

const plugins = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  production: [
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin("styles.css")
  ]
};


module.exports = Object.assign({
  resolve: {
    modulesDirectories: ["node_modules", "bower_components", "./frontend"],
    extensions: ["", ".js", ".min.js", ".scss", ".css"]
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css?modules&importLoaders=1&localIdentName=[name]__[local]!sass?sourceMap!postcss")
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      },
      {
        test: /\.(ttf|eot|woff|svg|jpe?g|gif|png)[\?]?.*$/,
        loader: 'file',
        query: {
          name: '[name][hash].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.js$/,
        loader: "babel",
        exclude: [
          /node_modules/,
          /libs/,
          /vendor/,
          /bower_components/,
        ]
      },
      {
        test: /\.css$/,
        loader: "style!css?sourceMap",
        exclude: [
          /node_modules/,
          /libs/,
          /vendor/
        ]
      }
    ]
  },
  sassLoader: {
    sourceMapContents: true
  },
  postcss: () => [
    autoprefixer(autoprefix),
    postcssMergeRules,
    postcssMergeLonghands,
    postcssMergeIdents,
    cssMqPacker,
    postcssSvgGo,
  ],
  plugins: plugins[process.env.NODE_ENV]
}, settings[process.env.NODE_ENV]);
