var Q = require('q')
  , models = require('node-url-shortener/app/models')

exports.retrieve = function(req, res, next) {
  var slug = req.params.slug
    , shortUrlPromise = models.ShortURL.cachedFindBySlug(slug)

  return shortUrlPromise
  .then(function(shortUrl) {
    if (shortUrl == null) {
      res.send(404)
      return
    }

    res.send({
      slug: shortUrl.slug,
      url: shortUrl.url
    })
  })
  .fail(next)
}

exports.create = function(req, res, next) {
  var url = req.body.url
    , shortUrlCreatePromise = models.ShortURL.createFromURL(url)

  return shortUrlCreatePromise
  .then(function(shortUrl) {
    res.send(201, {
      slug: shortUrl.slug,
      url: shortUrl.url
    })
  })
  .fail(next)
}
