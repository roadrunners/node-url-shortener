var _ = require('lodash')

var keyChar = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  , length = keyChar.length
  , decodeMap = makeDecodeMap()

function makeDecodeMap() {
  return _(keyChar)
  .reduce(function(m, v, k) {
    m[v] = k
    return m
  }, {})
}

exports.idToKey = function(n) {
  if (n == 0) {
    return keyChar[0]
  }

  var key = []

  while (n > 0) {
    var j = n % length
      , n = (n - j) / length

    key.push(keyChar[j])
  }

  return key.reverse().join('')
}

exports.keyToId = function(key) {
  return _(key)
  .reduce(function(n, v) {
    n *= length
    n += decodeMap[v]

    return n
  }, 0)
}
