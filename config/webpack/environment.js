const { environment } = require('@rails/webpacker')
const webpackConfig = require('./antdConfig')

environment.config.merge(webpackConfig)

module.exports = environment
