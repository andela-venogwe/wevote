const env = require('dotenv')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

env.config()
const { NODE_ENV, HOST_NAME, WS_HOST_NAME, MAPS_KEY } = process.env
const isDevMode = NODE_ENV === 'development'

const config = {
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public/assets'),
    publicPath: '/public/assets/',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/, /dist/, /server/],
        include: path.join(__dirname, 'client'),
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.s*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|svg|gif|ico)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(`${HOST_NAME}/api/v1/`),
      HOST_NAME: JSON.stringify(`${HOST_NAME}`),
      WS_HOST_NAME: JSON.stringify(`${WS_HOST_NAME}`),
      NODE_ENV: JSON.stringify(`${NODE_ENV}`),
      MAPS_KEY: JSON.stringify(`${MAPS_KEY}`)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: { mangle: true, compress: true }
    })
  ],
  resolve: { extensions: ['.js', '.jsx'] }
}

if (isDevMode) {
  config.entry = [
    config.entry,
    'webpack-hot-middleware/client?reload=true&quiet=true'
  ]
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    ...config.plugins
    // new BundleAnalyzerPlugin()
  ]
}

module.exports = config