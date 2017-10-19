const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const paths = require('./paths')

const hostname = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({ template: path.join(paths.appSrc, 'index.html') }),
  new OpenBrowserPlugin({ url: `http://${hostname}:${port}` })
]

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',  
  module: {
    rules: [...baseWebpackConfig.module.rules, {
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: ['style-loader','css-loader']
    },{
      test: /\.scss$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]',
        'sass-loader?sourceMap=true',
      ],
    }] 
  },
  plugins,
  devServer: {
    contentBase: paths.appDist,
    compress: true,
    port,
  }
})