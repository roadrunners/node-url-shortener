var _ = require('lodash')
  , environment = process.env.NODE_ENV || 'development'
  , defaultConfig = require('./default')
  , envOverrides = require('./env-overrides')
  , path = require('path')
  , envSpecificConfig = require(path.join(__dirname, 'environments', environment))
  , envSpecificDbConfig = envSpecificConfig.db

var genericConfig = _.merge({}, _.omit(defaultConfig, 'db'), _.omit(envSpecificConfig, 'db'))
  , dbConfig = _.defaults({}, envOverrides, envSpecificDbConfig)
  , config = _.merge({}, genericConfig, { db: dbConfig })

if (environment !== 'development') {
  _(['username', 'password', 'database', 'host'])
  .each(function(key) {
    if (config.db[key] === undefined) {
      console.log('DB properies are not defined properly and are required for this environment...')
      process.exit(1)
    }
  })
}

module.exports = config
