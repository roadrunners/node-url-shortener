require('remedial')

var config = require('node-url-shortener/config')
  , db = config.db

module.exports = function() {
  var password = (db.password === null || db.password === '') ? '' : '-p' + db.password

  return {
    shell: {
      'drop-database': {
        command: 'mysql -h {host} -u {username} {password} -e "drop database if exists {name}"'.supplant({ host: db.host, username: db.username, password: password, name: db.database }),
        failOnError: true
      },
      'create-database': {
        command: 'mysql -h {host} -u {username} {password} -e "create database if not exists {name}"'.supplant({ host: db.host, username: db.username, password: password, name: db.database }),
        failOnError: true
      }
    }
  }
}
