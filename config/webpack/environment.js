const { environment } = require('@rails/webpacker')
const antdConfig = require('./antdConfig')
const webpack = require('webpack')

environment.config.merge(antdConfig)

environment.plugins.prepend(
  'MomentIgnoreLocales',
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
)

module.exports = environment
