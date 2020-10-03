import { listBucket, knownBucket } from './commands/bucket.ts'
import { install } from './commands/install.ts'
import { listApps } from './commands/list.ts'
import { listPersists, cleanPersists } from './commands/persist.ts'
import { scoop } from './utils.ts'
import { outdent } from './deps.ts'

const { args } = Deno

;(() => {
  if (args[0] === 'bucket') {
    if (args[1] === 'list') return listBucket()
    if (args[1] === 'known') return knownBucket()
  }
  if (args[0] === 'install') return install(args)
  if (args[0] === 'list') return listApps(args[1])
  if (args[0] === 'persist') {
    if (args[1] === 'clean') return cleanPersists()
    if (args[1] === 'list') return listPersists(args[2])

    return console.log(outdent`
      scoop persist: cmd '${args[1] || ''}' not supported
      Usage: scoop persist clean|list [<args>]
    `)
  }

  scoop(args)
})()
