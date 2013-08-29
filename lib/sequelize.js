var config = require('node-url-shortener/config')
  , Sequelize = require('sequelize')

module.exports = new Sequelize(config.db.database, config.db.username, config.db.password, config.db)
