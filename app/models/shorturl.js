var Q = require('q')
  , redis = require('redis')
  , Sequelize = require('sequelize')
  , sequelize = require('node-url-shortener/lib/sequelize')
  , key = require('node-url-shortener/lib/key')
  , redis = require('node-url-shortener/lib/redis')
  , client = redis.createClient()

require('remedial')

var ShortURL = module.exports = sequelize.define('ShortURL', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  url: { type: Sequelize.STRING, allowNul: false }
}, {
  getterMethods: {
    slug: function() {
      return key.idToKey(this.id)
    }
  },
  classMethods: {
    findBySlug: function(slug) {
      var id = key.keyToId(slug)

      return Q.when(this.find(id))
    },
    cachedFindBySlug: function(slug) {
      var id = key.keyToId(slug)
        , shortUrlPromise = Q.ninvoke(client, 'get', 'shorturl:{id}:url'.supplant({ id: id }))
        , self = this

      return shortUrlPromise
      .then(function(url) {
        if (url !== null) {
          return self.build({
            id: id,
            url: url
          })
        }

        return self.find(id)
        .then(function(shortUrl) {
          if (shortUrl === null) {
            return null
          }

          shortUrl.pushToRedis()

          return shortUrl
        })
      })
    },
    createFromURL: function(url) {
      var createPromise = Q.when(this.create({ url: url }))

      return createPromise
      .then(function(shortUrl) {
        shortUrl.pushToRedis()

        return shortUrl
      })
    }
  },
  instanceMethods: {
    pushToRedis: function() {
      return Q.ninvoke(client, 'set', ['shorturl:{id}:url'.supplant({ id: this.id }), this.url])
    }
  },
  tableName: 'short_url'
})
