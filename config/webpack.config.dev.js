const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const paths = require('./paths')

const hostname = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

const plugins = [
  new HtmlWebpackPlugin({ template: path.join(paths.appSrc, 'index.html') }),
  new ExtractTextPlugin('styles.css'),
  new OpenBrowserPlugin({ url: `http://${hostname}:${port}` })
]

module.exports = merge(baseWebpackConfig, {
  plugins,
  devServer: {
    contentBase: paths.appDist,
    compress: true,
    port,
  }
})