var redis = require('redis')
  , config = require('node-url-shortener/config')

exports.createClient = function() {
  var client = redis.createClient(config.redis.port, config.redis.host)
  client.select(config.redis.database)

  client.on('error', function() {
    console.log('Disconnected from redis')
  })

  client.on('ready', function() {
    console.log('Connected to redis')
  })

  return client
}
