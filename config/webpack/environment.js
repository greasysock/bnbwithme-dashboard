const { environment } = require('@rails/webpacker')
const antdConfig = require('./antdConfig')

environment.config.merge(antdConfig)

module.exports = environment
