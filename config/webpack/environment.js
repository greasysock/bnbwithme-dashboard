const { environment } = require('@rails/webpacker')
const webpackConfig = require('./webpack.config')

environment.config.merge(webpackConfig)

module.exports = environment
