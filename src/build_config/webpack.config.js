var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postcssMergeRules = require('postcss-merge-rules');
var postcssMergeLonghands = require('postcss-merge-longhand');
var postcssMergeIdents = require('postcss-merge-idents');
var cssMqPacker = require('css-mqpacker');


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
      './examples/basic/index.js',
    ],
    output: {
      publicPath: 'public/assets',
      path: './public/assets',
      filename: 'myPackage.js',
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
      libraryTarget: 'umd',
      library: 'myPackage',
      filename: 'myPackage.js'
    },
    devtool: "source-map"
  },
  test: {
    entry: [
      'babel-polyfill',
      './src/index.js'
    ],
    output: {
      publicPath: 'lib',
      path: './lib',
      filename: 'myPackage.js'
    },
    devtool: null
  }
};


const commonPlugins = [
  new ExtractTextPlugin("myPackage.css")
];

const plugins = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    ...commonPlugins
  ],
  test: [
    ...commonPlugins
  ],
  production: [
    ...commonPlugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        loops: true,
        unused: true,
        cascade: true,
        evaluate: true,
        booleans: true,
        warnings: false,
        join_vars: true,
        if_return: true,
        screw_ie8: true,
        properties: true,
        comparisons: true,
        keep_fnames: true,
        conditionals: true,
        collapse_vars: true,
      },
      mangle: {
        toplevel: true,
        screw_ie8: true,
        keep_fnames: true,
      },
      minimize: true,
      comments: /@preserve/,
    })
  ]
};


module.exports = Object.assign({
  resolve: {
    modulesDirectories: ["node_modules", "bower_components", "./src"],
    extensions: ["", ".js", ".min.js", ".scss", ".css"]
  },
  cache: false,
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css?modules&localIdentName=[name]__[local]!sass?sourceMap!postcss")
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
  ],
  plugins: plugins[process.env.NODE_ENV]
}, settings[process.env.NODE_ENV]);
