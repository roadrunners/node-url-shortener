var _ = require('lodash')
  , config = require('node-url-shortener/config')
  , dbTasks = require('./db-tasks')
  , migrationTasks = require('./migration-tasks')

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell')

  var gruntConfig = _({})
  .merge(dbTasks())
  .value()

  grunt.initConfig(gruntConfig)

  grunt.registerTask('run-migrations', migrationTasks.runMigrations)
  grunt.registerTask('undo-migrations', migrationTasks.undoMigrations)
  grunt.registerTask('db-reset', ['shell:drop-database', 'shell:create-database', 'run-migrations'])

  grunt.registerTask('default', function() {
    console.log('Nothign yet')
  })
}
