var express = require('express')
  , app = express()
  , config = require('./config')
  , urlController = require('./app/controllers/url-controller')

app.enable('trust proxy')
app.use(express.responseTime())
app.use(express.bodyParser())

app.get('/:slug', urlController.retrieve)
app.post('/', urlController.create)

app.listen(config.port)

