const path = require('path')
const chokidar = require('chokidar')
const production = process.env.NODE_ENV === 'production'

class PurgeMarko {
  watch (baseDir) {
    if (!production) {
      baseDir = baseDir || '.'
      const watchDir = path.resolve(baseDir, '**/*.marko')
      const watcher = chokidar.watch(watchDir)
      watcher.on('ready', () => {
        watcher.on('all', (event, path) => {
          Object.keys(require.cache).forEach((id) => {
            if (id.indexOf('marko') >= 0) {
              delete require.cache[id]
            }
          })
          console.log(`[purge-marko] cache cleared`)
        })
      })
    }
  }
}

module.exports = new PurgeMarko()