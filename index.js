const path = require('path')
const chokidar = require('chokidar')
const production = process.env.NODE_ENV === 'production'

if (!production) {
  const prefix = '[purge-marko]'
  console.log(`${prefix} watching`)
  const watchDir = path.resolve('./**/*.marko')
  const watcher = chokidar.watch(watchDir)
  watcher.on('ready', () => {
    watcher.on('all', (event, path) => {
      Object.keys(require.cache).forEach((id) => {
        if (id.indexOf('marko') >= 0) {
            delete require.cache[id]
        }
      })
      console.log(`${prefix} cache cleared`)
    })
  })
}