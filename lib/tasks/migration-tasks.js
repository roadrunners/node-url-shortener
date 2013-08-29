var config = require('node-url-shortener/config')
  , db = config.db
  , sequelize = require('node-url-shortener/lib/sequelize')
  , migratorOptions = { path: process.cwd() + '/migrations' }
  , migrator = sequelize.getMigrator(migratorOptions)

exports.runMigrations = function() {
  var done = this.async()

  migrator.migrate()
  .success(function() {
    done()
  })
  .error(function() {
    console.log('error', arguments)
    done(false)
  })
}

exports.undoMigrations = function() {
  sequelize.migrator.findOrCreateSequelizeMetaDAO()
  .success(function(Meta) {
    Meta.find({ order: 'id DESC' })
    .success(function(meta) {
      if (meta) {
        migrator = sequelize.getMigrator(_.extend(migratorOptions, meta), true)
      }

      migrator.migrate({ method: 'down' })
      .success(function() {
        done()
      })
      .error(function() {
        console.log('error', arguments)
        done(false)
      })
    })
  })
}
