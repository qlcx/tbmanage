const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const paths = require('./paths')

const plugins = [
  new HtmlWebpackPlugin({ template: path.join(paths.appSrc, 'index.html') }),
  new ExtractTextPlugin('styles.css')
]

module.exports = merge(baseWebpackConfig, {
  plugins
})