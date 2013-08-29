module.exports = {
  cluster: {
    instances: 2
  },
  db: {
    username: 'root',
    password: null,
    database: 'node_url_shortener',
    host: '127.0.0.1',
    logging: console.log
  },
  redis: {
    host: 'localhost'
  }
}
