var _ = require('lodash')
  , config = require('./config')
  , cluster = require('cluster')
  , os = require('os')
  , numCPUs = os.cpus().length
  , totalInstances = config.cluster.instances || (numCPUs - 1)

require('remedial')

if (cluster.isMaster) {
  console.log('Creating {n} workers'.supplant({ n: totalInstances }))

  _(totalInstances).times(function() {
    cluster.fork()
  })

  cluster.on('exit', function(worker, code, signal) {
    var workerProcess = worker.process
      , pid = workerProcess.pid
      , exitCode = workerProcess.exitCode

    console.log('worker@{pid}#{id} died (with exitcode {exitCode}). Restarting...'.supplant({ pid: pid, id: worker.id, exitCode: exitCode }))

    cluster.fork()
  })
} else {
  var worker = cluster.worker
  console.log('Starting app on port ' + config.port)

  require('./server')
}
