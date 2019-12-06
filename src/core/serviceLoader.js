const glob = require('glob')
const path = require('path')
const dir = path.join(__dirname, '../services')

const loader = {}
loader.init = function() {
  const files = glob.sync(dir + '/*.js')

  for (const file of files) {
    const name = path.basename(file, '.js')
    const service = require(`../services/${name}`)

    if (!service._autoLoad) {
      continue
    }

    if (typeof service.init === 'function') {
      service.init()
    }

    loader[name] = service
    loader[name.replace(name[0], name[0].toUpperCase())] = service
  }
}

module.exports = loader
