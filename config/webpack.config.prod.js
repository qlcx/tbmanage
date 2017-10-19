const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const paths = require('./paths')

const plugins = [
  new HtmlWebpackPlugin({ template: path.join(paths.appSrc, 'index.html') }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new UglifyjsWebpackPlugin({
    uglifyOptions: {
      ie8: false,
      output: {
        comments: false,
        beautify: false,
      },
      mangle: {
        keep_fnames: true
      },
      compress: {
        warnings: false,
        drop_console: true
      },
    }
  }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css'
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),
]

module.exports = merge(baseWebpackConfig, {
  entry: {
    ...baseWebpackConfig.entry,
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },
  module: {
    rules: [...baseWebpackConfig.module.rules, {
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      })
    },{
      test: /\.scss$/,
      exclude: path.resolve(paths.appSrc, 'src/styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?modules&localIdentName=[name]___[local]',
          'sass-loader?sourceMap=true',
        ],
      })
    },]
  },
  plugins
})