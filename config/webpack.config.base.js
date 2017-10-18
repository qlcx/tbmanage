const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = require('./paths')

module.exports = {
  entry: { app: path.join(paths.appSrc, 'app') },
  output: {
    path: paths.appDist,
    filename: 'assets/js/[name].js'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  }
}